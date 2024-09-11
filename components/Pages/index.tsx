import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import { ColorType } from '../Libs/LightweightChart/types';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "Weather"
                                            //{{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>

 return (
  <div style={{ direction: "rtl", minHeight: "11vh", }}>
  <br-x />
  <Window title={name}
    style={{
    minHeight: 200, margin: 10, width: "calc(100% - 20px)",
    backgroundImage: 'url("https://cdn.ituring.ir/research/46/bg%20%281%29.webp")',
           // backgroundRepeat:"no-repeat",
   backgroundSize: "cover",
                                          
   }}>
       
        

        <w-cse>
          

          {props.books.map(book=>{
            return<img src = {book.imageLink}style={{ height:300,width:150,flex:1,objectFit:"fill" }}/>
          })}
          




         
          
        </w-cse>




        {/* <div style={{ direction: "ltr", fontSize: 25 }}>
          <span>Feels like: {props.feelslikec} °C</span>
          <br />
          <span>Humidity: {props.humidity} % RH</span>
          <br />
          <span>Pressure: {props.pressure}</span>
          <br />
          <span>Server date: {props.date}</span>
        </div> */}

      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  //let data = await (await fetch("https://cdn.ituring.ir/research/api/weather")).json()

 // let feelslikec = data.current_condition[0].FeelsLikeC
  //let humidity = data.current_condition[0].humidity
  //let pressure = data.current_condition[0].pressure

  //let date = new Date().toLocaleTimeString()
  
  let books = await global.db.collection("books").find({}).toArray()
  
  for  (let book of books){
    book.imageLink="https://cdn.ituring.ir/research/ex/books/"+ book.imageLink
    
}
  
  console.log(books)

  return {
    props: {
      data: global.QSON.stringify({
        session,
        books
       
        // nlangs,
      })
    },
  }
}