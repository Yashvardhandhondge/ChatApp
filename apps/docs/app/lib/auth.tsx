import GitHubProvider from "next-auth/providers/github";
import  CredentialsProvider  from "next-auth/providers/credentials";


export const NEXT_AUTH={
    providers:[
        CredentialsProvider({
            name:"Email",
            credentials:{
   username:{label:'email',type:'text',placeholder:'Email'},
   password:{label:'password',type:'password',placeholder:'password'},
            },
            async authorize(crdentials:any){
                // const username = crdentials.username;
                // const password = crdentials.password;
                // const user = await prisma.user.findOne({
                //     where:{
                //         email:username,
                //         password:password
                //     }
                // })
                // return(!user){
                //     return null;
                // }
                // return{
                //     id:user.id,
                //     email:user.email
                // }
                return {
                    id:"user1",
                    name:"yashvardhan",
                    email:"yashvardhandhondge@gmail.com"
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
          })
    ],
secret:process.env.NEXTAUTH_SECRET,
callbacks:{
    
    jwt:({token,user}:any)=>{
        console.log(token);
        
        return token
    },
    session:({session,token,user}:any)=>{
        console.log(session)
        if(session && session.user){
            session.user.id = token.userId
        }

      return session;      
    }
},
pages:{
    signIn:"/signin"
}
}