## [游戏:狩猎者之魂](http://nikfce.com:8101/?_blank)

本项目为游戏的前端,后端服务请移步到[loot-go](https://github.com/YapAmbition/loot-go?_blank)

### 部署方法:

- 克隆项目

`git clone git@github.com:YapAmbition/loot-go-front.git`

- 修改文件

修改`src/api/http.ts`,本地运行时把baseURL修改为`http://localhost:8080/`

- 安装依赖

`npm run install`

- 运行

`npm run start`

- 如果是在服务器上部署,希望服务能一直在后台运行,则需要修改文件`package.json`,修改start脚本为: `export PORT=8101 && nohup react-scripts start &`