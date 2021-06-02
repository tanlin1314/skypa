import axios from 'axios'
// 设置服务器IP地址
axios.defaults.baseURL = 'http://localhost:5000'


//API： 登录
//  account: 用户名
//  password: 密码
export const API_LOGIN = (account, password) => axios.post("/users/checkLogin", { account, password })

//API: 添加账号
//  account: 用户名
//  password: 密码
//  userGroup: 用户组  超级管理员|普通管理员
export const API_ADD_ACCOUNT = (account, password, userGroup) => axios.post("/users/add", { account, password, userGroup })
// 获取账号列表
// currentPage  当前页码
// pageSize 每页条数
export const API_ADD_list = (currentPage, pageSize) => axios.get("/users/list", { params: { currentPage, pageSize } })


// 删除账号
export const API_ADD_usersDel = (id) => axios.get("/users/del", { params: { id } })
// 批量删除账号
export const API_ADD_batchdel = (ids) => axios.get("/users/batchdel", { params: { ids } })
// 检查旧密码是否正确
export const API_ADD_checkoldpwd = (oldPwd, id) => axios.get("/users/checkoldpwd", { params: { oldPwd, id } })
// 修改密码
export const API_ADD_editpwd = (newPwd, id) => axios.post("/users/editpwd", { newPwd, id })
// 获取账号（个人中心）信息
export const API_ADD_accountinfo = (id) => axios.get("/users/accountinfo", { params: { id } })
// 11. 验证token是否过期
export const API_ADD_checktoken = (token) => axios.get("/users/checktoken", { params: { token } })


// 获取商品列表
export const API_ADD_goodsList = (currentPage, pageSize) => axios.get("/goods/list", { params: { currentPage, pageSize } })
// 商品图片上传接口
// export const API_ADD_goods_img_upload = () => axios.post("/goods/goods_img_upload", {})
//  添加商品
export const API_ADD_goodsAdd = (name, category, price, imgUrl, goodsDesc) => axios.post("/goods/add", { name, category, price, imgUrl, goodsDesc })
//查询所有分类名称
export const API_ADD_categories = () => axios.get("/goods/categories", { params: {} })
//  获取分类
export const API_ADD_catelist = (currentPage, pageSize) => axios.get("/goods/catelist", { params: { currentPage, pageSize } })
//修改分类
export const API_ADD_editcate = (id, cateName, state) => axios.post("/goods/editcate", { id, cateName, state })
//  获取店铺详情
export const API_ADD_info = () => axios.get("/shop/info", { params: {} })
// 店铺图片上传接口
export const API_ADD_upload = () => axios.post("/shop/upload", {})
//  店铺内容修改
// export const API_ADD_edit = (id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics
// ) => axios.post("/shop/edit", {id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics})
export const API_ADD_edit = (params) => axios.post("/shop/edit",  params)
// 首页报表接口/order/totaldata
export const API_ADD_totaldata = () => axios.get("/order/totaldata", { params: {} })
// 订单报表接口/order/ordertotal
export const API_ADD_ordertotal = (date) => axios.get("/order/ordertotal", { params: {date} })
