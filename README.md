# 我的餐廳清單

提供各式料理的餐廳清單，並可察看餐廳簡介、地址電話，及評分資訊等。
亦可自行新增及修改清單，打造專屬的餐廳集合。

---

## 專案畫面

![Index page about Restaurant List](./public/image/index2.png)

---

## 環境建置與需求 (prerequisites)

- Node.js 14.16.0
- Express 4.16.4
- Express-handlebars 3.0.0
- Bootstrap 4.3.1
- Font-awesome 6.2.0
- Mongoose 5.9.7
- method-override 3.0.0

## 使用說明

1. 請先確認有安裝 node.js 與 npm
2. 透過終端機，Clone 此專案至本機電腦

   ```bash
   git clone https://github.com/linway035/restaurant.git
   ```

3. 透過終端機，cd 至存放的資料夾
4. 啟動伺服器，執行 app.js 檔案
   ```bash
    nodemon app.js
   ```
5. 成功連結後，開啟任一瀏覽器瀏覽器輸入 http://localhost:3000/ 開始使用

## 網站功能介紹

- 卡片式清單，包含餐廳照片、名稱及評分
- 搜尋欄可透過餐廳名稱或餐品種類搜尋
- 點選店家後，可以瀏覽詳細資訊
- 新增、修改，及移除清單項目
- 選擇排序方式
