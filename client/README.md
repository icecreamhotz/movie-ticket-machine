## Technologies (Front End)

### `React Library`
* โปรเจคนี้ถูกกำหนดให้ใช้ React หรือ React Framework เท่านั้นจึงเลือกใช้ React ที่เป็น Library ธรรมดาที่ไม่ได้ใช้เป็น React Framework(Next.js) เนื่องจากโปรเจคนี้ไม่จำเป็นต้องมีการใช้เทคนิค SSR (Server Side Rendering)
* หากไม่ได้ใช้ Framework เราสามารถเขียนโปรแกรมในรูปแบบของเราได้ไม่ได้ยึดติดกับกรอบของ Framework มากเท่าไร
* มีขนาดเล็กกว่า Framework แน่นอน
### `Redux`
* เนื่องจากโปรเจคนี้ถูกพัฒนาโดย React ซึ่งหลักการออกแบบส่วนของหน้าตา UI(User Interface) ที่ต้องมองเป็น Component ย่อยๆลงไป ดังนั้นเราจึงมีการส่งค่ากลับไปกลับมาบ่อยครั้งหากไม่ใช่ Redux อาจจะต้องทำให้จัดการกับ State แต่ละ Component ส่งไปอีก Component นั้นเป็นไปได้ยาก
### `Ant Design`
* Ant Design React UI Framework นั้นสวยและมี Component ให้เรียกใช้หลากหลาย

## Technologies (Back End)

### `NodeJS`
* Libaries ที่เปิดให้ใช้ฟรีเยอะ
* โค้ดที่เขียนออกมาเข้าใจง่าย
* เป็น Library ที่มีเทคโนโลยี Non Blocking I/O  หรือก็คือหากมี Request จากผู้ใช้ในจำนวนมากๆตัว NodeJS จะไม่ให้ผู้ใช้ที่อยู่ลำดับหลังๆรอ Resource ที่ต้องการเมื่อผู้ใช้ในลำดับแรกๆเสร็จก่อนแต่ถ้า Resource พร้อมเมื่อไหร่สามาถตอบกลับได้ทันที
### `Mongo Atlas`
* ช่วยในการ กำหนดค่า, ดูแลรักษา, และการปรับค่าต่างๆเป็นไปแบบ Automate ทั้งหมดจากศูนย์กลาง ทำให้ไม่ต้องมีผู้ดูแลระบบมากอย่างแต่ก่อนและปลอดภัยมากขึ้นเนื่องจากรูปแบบนั้นอ้างอิงจาก AWS
* มีบริการให้ใช้ฟรี
### `GraphQL`
* มีการกำหนด Route น้อย
* หากทางฝั่งหน้าบ้านต้องการข้อมูลฟิลด์ไหนสามารถเรียกใช้ได้เลยต่างกับ REST API ที่ต้องการข้อมูลไหนก็ต้องสร้าง route ก่อนและทำ Business Logic ข้างในอีกที จึงทำให้ถ้าโปรแกรมมีข้อมูลที่ต้องการเยอะขึ้นแต่ข้อมูลนั้นต่างกันก็ต้องสร้าง route ใหม่ขึ้นมาเรื่อยๆ
* เขียนเข้าใจง่าย

## Architecture Design
1. Web Browser ผู้ใช้สามารถใช้ผ่าน Web Browser เป็นหลัก
2. ผู้ใช้ Request มายัง Static file หรือเรียกเปิดหน้าไฟล์ใน Firebase
3. Web Browser ไป Request API บน Heroku Server
4. จากนั้นร้องขอข้อมูลใน Atlas
5. ส่งค่ากลับไปเป็นลำดับ

## Installation 
### `React`
1. Clone or Download Github
2. เปิด command line และพิมพ์ npm install
3. ในไฟล์ config/api.js แก้ url ให้เป็น url ของ server
4. เริ่มการทำงานพิมพ์ npm start
5. หากต้องการ test พิมพ์ npm test -- --watch

### `NodeJS`
1. Clone or Download Github
2. เปิด command line และพิมพ์ npm install
3. ในไฟล์ env แก้ MONGO_USERNAME, MONGO_PASSWORD, MONGO_DATABASE เป็นข้อมูลที่ Atlas สร้างไว้
4. เริ่มการทำงานพิมพ์ npm start

## Deployment
### `Front End`
Deploy ขึ้นบน Firebase Hosting เพราะว่าฟรีและใช้เวลา Deploy ไม่เกิน 2 นาที
* https://thinknet-cinema.firebaseapp.com/

### `Back End`
Deploy ขึ้นบน Heroku เพราะว่าฟรีและใช้เวลา Deploy ไม่เกิน 5 นาทีถามยังรอบรับ SSL อีกด้วย (https)
* https://thinknet-cinema.herokuapp.com/







