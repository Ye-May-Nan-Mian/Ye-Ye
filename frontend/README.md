# From developer (PaJir/LiuJiapan)

## From run to package

```
# must install packages
npm install
# start without build
npm run start
# build and package
npm run build
```

## Thanks For

[react](reactjs.org) for this project

[electron](electronjs.org) package this project

[axios](https://www.npmjs.com/package/axios) for interface transmission. 

[react-webcam](https://github.com/mozmorris/react-webcam) for camera.

[React Webcam - Take Screenshot Issues](https://stackoverflow.com/questions/39312341/react-webcam-take-screenshot-issues) for snapshot. 

[react-webcam (npm package) video sizing](https://stackoverflow.com/questions/55920961/react-webcam-npm-package-video-sizing)

[The create-react-app imports restriction outside of src directory](https://stackoverflow.com/questions/44114436/the-create-react-app-imports-restriction-outside-of-src-directory)

[React 引入大量本地图片](https://segmentfault.com/q/1010000009641349)

[this](https://www.howtoing.com/how-to-build-a-modern-web-application-to-manage-customer-information-with-django-and-react-on-ubuntu-18-04) taught me how to build a front-end framework. 

[No way to get fill path of selected file](https://stackoverflow.com/questions/15201071/how-to-get-full-path-of-selected-file-on-change-of-input-type-file-using-jav)

[Preview an image before it is uploaded](https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded) using FileReader. 

[this](https://www.geeksforgeeks.org/file-uploading-in-react-js/) helps me upload file.

[Flex layout tutorial - Ruan Yifeng](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

[Ant Design](https://ant.design/components/overview-cn/) save my time on design. 

[This article](https://segmentfault.com/a/1190000014030465) & [another article](https://juejin.im/post/6844903669293400072) help me use electron

[Use less in React](https://www.jianshu.com/p/94ac7250ccf0)

[redux](https://redux.js.org/)

[How to user Redux in React](https://juejin.cn/post/6844903942371934215)

Icons from [flaticon](https://www.flaticon.com/)

## Maybe Work But We Don't Use

[使用 React 和 Django REST Framework 构建你的网站](https://zhuanlan.zhihu.com/p/33546988). The article above is enouth to teach me how to build our software, and we don't want to use `store` in frontend at first. In the development process, we start to use `store`, but we refer to other articles. Anyway, this is a good article for building the next software. 

[html5调用摄像头功能](http://shenzekun.cn/html5%E8%B0%83%E7%94%A8%E6%91%84%E5%83%8F%E5%A4%B4%E5%8A%9F%E8%83%BD.html), this is useful in JS, but unuseful in React. 

[Bootstrap](https://getbootstrap.com/) for some styles. 

[react-html5-camera-photo](https://www.npmjs.com/package/react-html5-camera-photo) for handling camera. 

[html2canvas](https://github.com/niklasvh/html2canvas/) for screenshot. 

[【React】组件 写一个模仿蓝湖的图片查看器](https://juejin.cn/post/6844903872163479559)

HOOK

```
/src/:.
└─component
    ├─Page.jsx--------------manage all the pictures(sheet music) diplayed on the screen page
    ├─Service.js------------use axios to transfer data with the backend
    ├─UploadFile.jsx--------upload your sheet music
    └─Video.jsx-------------open camera and decide whether to turn pages
├─App.js--------------------
└─index.js------------------
```

# From React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode. Then the web-app will run as an application. Also you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run build`

Builds the app for production to the `build` folder.

Before you `build` our project, you must uncomment index.js:22 and comment index.js:25&26. Otherwise, the application you open may be blank. 
