import { Hono } from 'hono'

const app = new Hono()

async function authMiddleware(c: any,next: any){
  
    if(c.req.header('Authorization')){
      console.log('Hi before');
      const initTime = new Date();
       await next()
       const totalTime = (new Date().getTime() - initTime.getTime())/1000;
      console.log(`Hi After ${totalTime}`);
    } else{
      return c.text('You dont have access')
    }
  
}
app.use(authMiddleware)

app.post('/', async (c) => {
  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header('Authorization'));
  console.log(c.req.query('param'));

  return c.text('Hello Hono!')

})

export default app
