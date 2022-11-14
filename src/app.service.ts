import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoClient } from 'mongodb'
import { DataSource, Repository } from 'typeorm';
import { config } from './data';
import { ErrorsEntity } from './entity/errors.entity';
import { ResourcesDetailsEntity } from './entity/resources-details.entity';
import { ResourcesLikesEntity } from './entity/resources-likes.entity';
import { ResourcesMembersEntity } from './entity/resources-members.entity';
import { ResourcesMentionsEntity } from './entity/resources-mentions.entity';
import { ResourcesRElationsEntity } from './entity/resources-relations.entity';
import { ResourcesEntity } from './entity/resources.entity';
import { ResourcesFollowersEntity } from './entity/resources_followers.entity';
import { TaskProjectEntity } from './entity/task-project.entity';
const uri = 'mongodb://root:111111@localhost:27017/?authMechanism=DEFAULT';
const db = new MongoClient(uri);
const database = db.db("work_space_test");
const fieldsStories =  ['comment_added'];
@Injectable()
export class AppService {
  constructor(private connection: DataSource,
    @InjectRepository(ResourcesEntity) private readonly resource: Repository<ResourcesEntity>,
    ){

  }

  async run() {
    // return this.getProject();
    await this.getTask();
    return this.taskInfo()



    // await this.exec()

    // await this.createResourceMention()
    // await this.handleUserTeams()
    // await this.createTaskProject()
    // return Promise.all([k1, k2, k3])
  }

  findAll(conllectionName: string){
    return database.collection(conllectionName).find({}).toArray();
  }

  async handleWorkspace(){
    const result = await this.findAll('workspace') 
    let i = 0;
    for(let item of result){
      console.log(i++)
      const { gid, name, resource_type } = item;
      this.connection.getRepository(ResourcesEntity).save({ gid,name,resource_type: resource_type })
    }
  }

  async handle(conllectionName: string, owner: string, key: string, checkOwner: any) {
    console.log(`Đang insert ${key}`)
    // let position: 0
    // let limit: 100

    // const total = await database.collection(conllectionName).count()
    // if(total > limit){
      
    // }

    // const data = await database.collection(conllectionName).find({}).skip(0).limit(10).toArray()

    let result = await this.findAll(conllectionName) 
    
    let i = 0;
    if(key === 'story'){
        result = result.filter((item) => fieldsStories?.includes(item.resource_subtype));
    }
    for(let item of result){
      console.log(i++)
      const { gid, name, resource_type } = item;

      let input;
      if (key === 'story'){
          input = {
              gid, name: item.html_text, resource_type: resource_type
          };  
      }else {
          input = {
              gid, name, resource_type: resource_type
          }; 
      }


      // const data = await this.connection.getRepository(ResourcesEntity).save(input)
      // await this.handelInsertResourcesDetails(data.id, item, key)
      //insert resources_relations
      // const func = async (gid: any, id: any) => {
      //     const parent = await this.connection.getRepository(ResourcesEntity).findOne({
      //       where: {
      //         gid,
      //       }
      //     })
      //     if(parent) {
      //         await this.connection.getRepository(ResourcesRElationsEntity).save({ resources_id: data.id, resources_parent_id: parent.id })
      //     }   
      // }
      
      // if(checkOwner){
      //   if(key === 'task'){
      //     for(let section of item.sections){
      //         if(section) await func(section.gid, data.id)
      //     }
      //   }else{
      //       if(item[owner]){
      //         await func(item[owner].gid, data.id)    
      //       }
      //   }
        
      // }

      // if(item?.followers && item?.followers.length) await this.handleRelations(item?.followers, data.id, 'followers') //insert follower
      // if(item?.members && item?.members.length)  await this.handleRoles(item?.members, data.id, 'members', item?.owner) //insert members
      // if(item?.num_likes && item?.likes.length)  await this.handleRelations(item?.likes, data.id, 'likes') //insert members

    }
  }

  // handleRelations
  async handleRoles(members: any, resources_id: any, key: any, owner = null){//insẻrt follower, like, member
    //owner full quyen
    if(owner){
      const user = await this.connection.getRepository(ResourcesEntity).findOne({
        where: {
          gid: owner.gid,
        }
      }) 
      if(!user){
        await this.insert(ErrorsEntity, {
          messages: `Lỗi không tìm thấy userId`,
          gid: owner.gid
        })
      } else {
        await this.connection.getRepository(ResourcesMembersEntity).save({ member_id: user.id, resources_id, is_create: true, is_read: true, is_update: true, is_delete: true })
      }
      members = members.filter((item: any) => item.gid !== owner.gid) //loaij bo owner trong member
    }

    return this.handleRelations(members, resources_id, key);
  }

  async handleRelations(items: any, resources_id: any, key: any){
    if(items && items.length > 0){
      for(let item of items){
          const { resource_type, gid } = item
          const user = await this.connection.getRepository(ResourcesEntity).findOne({
            where: {
              gid: key === 'likes' ? item.users.gid : item.gid,
            }
          }) 
          if(!user) await this.insert(ErrorsEntity, {
            messages: `Lỗi không tìm thấy userId`,
            gid: item.gid
          })
          if(user){
              if(key === "followers"){
                await this.connection.getRepository(ResourcesFollowersEntity).save({ followers_id: user.id, resources_id, resource_type: resource_type, gid })            
              }
              if(key === "members"){
                await this.connection.getRepository(ResourcesMembersEntity).save({ member_id: user.id, resources_id, is_create: true, is_read: true, is_update: false, is_delete: false })
              }

              if(key === "likes"){
                await this.connection.getRepository(ResourcesLikesEntity).save({ resources_id, user_id: user.id })
              }
          }            
      }
  }
  }

  async handleDetailsTask(id: any , item: any){
    const {
          assignee,
          assignee_status,
          completed,
          html_notes,
          is_rendered_as_separator,
          liked,
          notes,
          num_likes,
          num_subtasks,
          resource_subtype,
          custom_fields,
          created_at,
      } = item;
      if(assignee){
        const user = await this.connection.getRepository(ResourcesEntity).findOne({
          where: {
            gid: Number(assignee?.gid)
          }
        }) 
        const input = {
          id,
          resources_id: id,
          created_at,
          assignee: user ? user.id : null,
          assignee_status,
          completed,
          html_notes,
          is_rendered_as_separator,
          liked,
          notes,
          num_likes,
          num_subtasks,
          resource_subtype,
          custom_fields: JSON.stringify(custom_fields),
      }


      return this.connection.getRepository(ResourcesDetailsEntity).save(input)
    }
  }

  handleDetailsStory(id: any, item: any){
    const { 
        source,
        text,
        resource_subtype,
        created_at
    } = item;
    const input = {
        id,
        resources_id: id,
        source,
        text,
        resource_subtype,
        created_at
    }
    return this.connection.getRepository(ResourcesDetailsEntity).save(input)
  }

  handleDetailsProject(id: any , item: any){
    const { archived,
        color,
        html_notes,
        notes,
        public: p_lic, 
        created_at
    } = item;
    const inputProjects = {
        id,
        resources_id: id,
        created_at,
        archived,
        color,
        html_notes,
        notes,
        is_public: p_lic
    }
    return this.connection.getRepository(ResourcesDetailsEntity).save(inputProjects)
  }

  async handelInsertResourcesDetails(id: any, item: any, tableName: any){
    switch(tableName) {
        case 'teams':
            const inputTeams = {
                id, resources_id: id, description: item.description, html_description: item.html_description
            }
            return this.connection.getRepository(ResourcesDetailsEntity).save(inputTeams)
        case 'project':
            return this.handleDetailsProject(id, item);
        case 'section':
          return this.connection.getRepository(ResourcesDetailsEntity).save({ id, resources_id: id, created_at: item.created_at })
        case 'task':
        case 'subTask':
          return this.handleDetailsTask(id, item);
        // case 'attachment':
        //     return handleDetailsAttachment(id, item);
        case 'story':
            return this.handleDetailsStory(id, item);
        // case 'tag':
        //     return handleDetailsTag(id, item);
        case 'user':
            return this.connection.getRepository(ResourcesDetailsEntity).save({ id, resources_id: id, email: item.email })
        // case 'customFiled':
        //     return insert({ id, resources_id: id,enum_options: JSON.stringify(item.enum_options), resource_subtype: item.resource_subtype, type: item.type, precision: item.precision ? item.precision : null }, TABLE.RESOURCE_DETAILS)
        // default:
          // code block
      }
  }

  async createResourceMention(){
    console.log(`Đang insert ResourceMention`)
    let tasks = await this.findAll('tasks')
    let subtasks = await this.findAll('subtask')
    let stories = await this.findAll('stories')

    stories = stories.filter((item) => fieldsStories?.includes(item.resource_subtype));
    const func = async(tasks: any) => {
        console.log(tasks)
        let i = 0
        for(let task of tasks){
            console.log(i++)
            const storiesForTask = stories.filter(k => k.target.gid === task.gid )//tim tat ca binh luan thuoc task
            //loc qaa tat ca cac binh luan thuoc task
            for(let item2 of storiesForTask){
                const storie = await this.connection.getRepository(ResourcesEntity).findOne({
                  where: {
                    gid: item2.gid,
                  }
                }) 
                
                if(storie){
                    for(let user of task.followers){
                        const data = await this.connection.getRepository(ResourcesEntity).findOne({
                          where: {
                            gid: user.gid,
                          }
                        })
                        if(data){
                            await this.connection.getRepository(ResourcesMentionsEntity).save({ resources_id: storie.id, member_id: data.id })
                        }                        
                    }
                }                
            }            
        }
 
               
    }

    await func(tasks)
    await func(subtasks)
  }

  async createTaskProject(){
    console.log(`Đang insert TaskProject`)
    let tasks = await this.findAll('tasks')
    let subtasks = await this.findAll('subtask')

    const func = async(tasks: any) => {
        let i = 0;
        for(let item of tasks){
            console.log(i++)
            const { projects, gid } = item;
            const task = await this.connection.getRepository(ResourcesEntity).findOne({
              where: {
                gid: gid,
              }
            }) 

            for(let project of projects){
                const dataProject = await this.connection.getRepository(ResourcesEntity).findOne({
                  where: {
                    gid: project.gid,
                  }
                }) 
                if(task && dataProject){
                    await this.insert(TaskProjectEntity, { task_id: task.id, project_id: dataProject.id });
                }
            }

        }        
    }

    let k1 = func(tasks)
    let k2 = func(subtasks)
    return Promise.all([k1, k2])
  }

  async handleUserTeams(){
    console.log('Dang inser userTeam')
     const userTeams = await this.findAll('teams')
     if(userTeams.length > 0){
        await Promise.all(userTeams.map(async item => {
            const user = await this.connection.getRepository(ResourcesEntity).findOne({
              where: {
                gid: item.userGid,
              }
            }) 
            const team = await await this.connection.getRepository(ResourcesEntity).findOne({
              where: {
                gid: item.gid,
              }
            }) 
            if(user && team){
                const input = { resources_id: team.id, member_id: user.id };
                return this.connection.getRepository(ResourcesMembersEntity).save(input)              
            }

        }));        
     }
  }

  insert(entity: any, input: any){
    return this.connection.getRepository(entity).save(input)
  }

  async exec(){
    for (const property in config) {
        const obj = config[property];
        await this.handle(obj.conlection, obj.parent, obj.name, obj.owner)
    }
  }

  async getProject(){
    const data = await this.resource.createQueryBuilder('r')
      .leftJoinAndSelect('r.resource_relations', 'rl')
      .leftJoinAndSelect('rl.resourceOne', 'rone')
      .leftJoinAndSelect('rone.member', 'member')
      .where('r.id = :id', { id: 884 })
      .andWhere('member.member_id = :member', { member: 709 })
      .getOne()

      if(data){
        data.resource_relations.map((item) => {
          console.log(item.resourceOne)
        })
      
      }        
  }

  async getTask(){
    const data = await this.resource.createQueryBuilder('r')
      .leftJoinAndSelect('r.taskProject', 'tp')
      .leftJoinAndSelect('tp.task', 't')
      .where('r.id = :id', { id: 992 })
      .getOne() 
    console.log(data.taskProject)

  }

  //15670
  async taskInfo(){
    const data = await this.resource.createQueryBuilder('r')
      .leftJoinAndSelect('r.resource_relations', 'rl')
      .leftJoinAndSelect('rl.resourceOne', 'rone')
      // .leftJoinAndSelect('tp.task', 't')
      .where('r.id = :id', { id: 15670 })
      .andWhere('rone.resource_type = :name', { name: 'story' })
      .getOne() 
    console.log(data.resource_relations)
  }
}
  
