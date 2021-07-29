import { Application, Context } from "https://deno.land/x/oak@v8.0.0/mod.ts";

const app = new Application();

async function fn(ctx: Context) { 
  if(ctx.request.method == "GET"){
    ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");
    ctx.response.body = `
     <h3>Deno Oak framework</h3>
     <form action="/" enctype="multipart/form-data" method="post"> 
       <div>File: <input type="file" name="singleFile"/></div>
       <input type="submit" value="Upload" />
     </form>
  `;
  }
  if(ctx.request.method == "POST"){
    const dataPromise  = ctx.request.body({type:"form-data"})
    const data = await dataPromise.value
    const formDataBody = await data.read()
    console.log(formDataBody.files) 
    if(formDataBody.files  && formDataBody.files.length > 0){
      const obj = formDataBody.files[0]
      const pathTmp = String(obj.filename)
      await Deno.copyFile(pathTmp,"img.png")

    }
    


    ctx.response.headers.set("Content-Type", "text/html; charset=utf-8");
    ctx.response.body = `
     <h3>Deno Oak framework</h3>
     <p> file recived </p> <br />
     <a href="/">home</a>
  `;

  }



}

app.use((ctx: Context) => fn(ctx));
console.log("http://localhost:8000")
await app.listen({ port: 8000 });
// deno run --allow-all app.ts
