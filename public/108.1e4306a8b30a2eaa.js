"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[108],{108:(C,c,n)=>{n.r(c),n.d(c,{Tab3PageModule:()=>m});var l=n(2112),u=n(1368),g=n(4716),h=n(4692),d=n(9148),v=n(1528),f=n(7136),e=n(4496),p=n(5400);const b=[{path:"",component:(()=>{var o;class s{constructor(a){this.db=a,this.waterLevel1=0,this.waterLevel2=0,this.waterLevel3=0,this.getMeasures1(),this.getMeasures2(),this.getMeasures3()}ngOnInit(){console.log("Tab3Page initialized")}getMeasures1(){this.db.object("test1/float").valueChanges().subscribe(t=>{null!==t?(console.log("Medici\xf3n: ",t),this.waterLevel1=Math.floor(this.calculateWaterLevel(t)),console.log("Nivel de agua actualizado:",this.waterLevel1),this.checkAndSendNotification(this.waterLevel1,1)):console.log("El valor es nulo.")})}getMeasures2(){this.db.object("test2/float").valueChanges().subscribe(t=>{null!==t?(console.log("Medici\xf3n: ",t),this.waterLevel2=Math.floor(this.calculateWaterLevel(t)),console.log("Nivel de agua actualizado:",this.waterLevel2),this.checkAndSendNotification(this.waterLevel2,2)):console.log("El valor es nulo.")})}getMeasures3(){this.db.object("test3/float").valueChanges().subscribe(t=>{null!==t?(console.log("Medici\xf3n: ",t),this.waterLevel3=Math.floor(this.calculateWaterLevel(t)),console.log("Nivel de agua actualizado:",this.waterLevel3),this.checkAndSendNotification(this.waterLevel3,3)):console.log("El valor es nulo.")})}calculateWaterLevel(a){let i=(150-a)/150*100;return i<0&&(i=0),i>100&&(i=100),i}checkAndSendNotification(a,t){var i=this;return(0,v.c)(function*(){a>=80&&a<90?yield i.sendNotification(t,"Nivel de agua alto en el tanque "+t,"El nivel de agua est\xe1 por encima del 80%."):a>=90&&(yield i.sendNotification(t,"\xa1Nivel de agua cr\xedtico! en el tanque "+t,"El nivel de agua ha superado el 90%."))})()}sendNotification(a,t,i){f.G.schedule({notifications:[{id:a,title:t,body:i,allowWhileIdle:!0}]}).then(()=>{console.log("Notificaci\xf3n enviada con \xe9xito.")}).catch(P=>{console.error("Error al enviar la notificaci\xf3n:",P)})}}return(o=s).\u0275fac=function(a){return new(a||o)(e.GI1(p.qk))},o.\u0275cmp=e.In1({type:o,selectors:[["app-tab3"]],decls:29,vars:9,consts:[[1,"transparent-background"],[1,"tank"],[1,"water"],[1,"water-level"]],template:function(a,t){1&a&&(e.I0R(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e.OEk(3," Niveles "),e.C$Y()()(),e.I0R(4,"ion-content")(5,"ion-card",0)(6,"ion-card-header"),e.OEk(7," Nivel de Agua T1 "),e.C$Y(),e.I0R(8,"ion-card-content")(9,"div",1),e.wR5(10,"div",2),e.I0R(11,"div",3),e.OEk(12),e.C$Y()()()(),e.I0R(13,"ion-card",0)(14,"ion-card-header"),e.OEk(15," Nivel de Agua T2 "),e.C$Y(),e.I0R(16,"ion-card-content")(17,"div",1),e.wR5(18,"div",2),e.I0R(19,"div",3),e.OEk(20),e.C$Y()()()(),e.I0R(21,"ion-card",0)(22,"ion-card-header"),e.OEk(23," Nivel de Agua T3 "),e.C$Y(),e.I0R(24,"ion-card-content")(25,"div",1),e.wR5(26,"div",2),e.I0R(27,"div",3),e.OEk(28),e.C$Y()()()()()),2&a&&(e.yG2(10),e.m4B("height",t.waterLevel1,"%"),e.yG2(2),e.oRS("",t.waterLevel1,"%"),e.yG2(6),e.m4B("height",t.waterLevel2,"%"),e.yG2(2),e.oRS("",t.waterLevel2,"%"),e.yG2(6),e.m4B("height",t.waterLevel3,"%"),e.yG2(2),e.oRS("",t.waterLevel3,"%"))},dependencies:[l.KC,l.Gg,l.YY,l._i,l.wB,l.tM,l.Md],styles:['@charset "UTF-8";.transparent-background[_ngcontent-%COMP%]{background-color:transparent!important}.tank[_ngcontent-%COMP%]{width:90px;height:135px;background-color:#ccc;position:relative;margin:0 auto;border-radius:50px/10px;overflow:hidden}.tank[_ngcontent-%COMP%]:before{content:"";position:absolute;top:-20px;left:0;width:100%;height:40px;background-color:#ccc;border-top-left-radius:50%;border-top-right-radius:50%}.water[_ngcontent-%COMP%]{width:100%;background-image:url(wave.5c36f11218903a8e.png);background-size:100% auto;background-repeat:repeat-x;position:absolute;bottom:0;left:0;transition:height .5s ease;animation:_ngcontent-%COMP%_moveWaves 7s linear infinite}@keyframes _ngcontent-%COMP%_moveWaves{0%{background-position-x:1000px}to{background-position-x:0px}}.water-level[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:20px;color:#fff}']}),s})()}];let M=(()=>{var o;class s{}return(o=s).\u0275fac=function(a){return new(a||o)},o.\u0275mod=e.a4G({type:o}),o.\u0275inj=e.s3X({imports:[d.qQ.forChild(b),d.qQ]}),s})(),m=(()=>{var o;class s{}return(o=s).\u0275fac=function(a){return new(a||o)},o.\u0275mod=e.a4G({type:o}),o.\u0275inj=e.s3X({imports:[l.wZ,u.MD,g.y,h.C,M]}),s})()}}]);