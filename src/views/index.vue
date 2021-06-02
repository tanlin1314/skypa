<template>
  <div>
    <el-row>
      <!-- 左 -->
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
          >
            <!-- 判断children(秋准) 有就创建二级路由
            没有就是一级路由   用v-if v-else 判断  如果条件满足(children) 就渲-->
            <div v-for="item in jurisdiction" :key="item.index">
              <el-submenu v-if="item.children" :index="item.index">
                <template slot="title">
                  <i :class="item.foot"></i>
                  <span>{{item.title}}</span>
                </template>
                <div v-for="item1 in item.children" :key="item1.index">
                  <el-menu-item :index="item1.index">{{item1.title}}</el-menu-item>
                </div>
              </el-submenu>
              <el-menu-item v-else :index="item.index">
                <i :class="item.foot"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </div>
      </el-col>
      <!-- 右 -->
      <el-col :span="18">
        <!-- 面包屑 -->
        <div class="hode">
          <div class="mbx">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="item in crumbs" :key="item">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="xdc">
            <div class="xsx">
              <el-dropdown>
                <span class="el-dropdown-link">
                  欢迎你，
                  <span v-html="account"></span>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <router-link to="/Index/MY">个人中心</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!-- 头像 -->
            <div class="demo-basic--circle">
              <div class="block">
                <el-avatar :size="30" :src="circleUrl"></el-avatar>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-content bg-purple-light">
          <router-view />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { API_ADD_accountinfo, API_ADD_checktoken } from "@/api/api";
export default {
  data() {
    return {
      // super  超级  normal普通
      tresslist: [
        // 一级路由
        {
          index: "/Index/homePage",
          foot: "el-icon-menu",
          title: "后台首页",
          role: ["super", "normal"]
        },
        {
          index: "/Index/management",
          foot: "el-icon-menu",
          title: "订单管理",
          role: ["super", "normal"]
        },
        {
          index: "1",
          foot: "el-icon-menu",
          title: "商品管理",
          role: ["super", "normal"],
          children: [
            { index: "/Index/Productlist", title: "商品列表" },
            { index: "/Index/goods_add", title: "商品添加" },
            { index: "/Index/Categories", title: "商品分类" }
          ]
        },
        {
          index: "2",
          foot: "el-icon-menu",
          title: "账号管理",
          children: [
            { index: "/Index/tianjiazh", title: " 添加账号" },
            { index: "/Index/xg", title: "修改密码" },
            { index: "/Index/lb", title: "账号列表" }
          ],
          role: ["super"]
        },
        {
          index: "/Index/dianpu",
          foot: "el-icon-menu",
          title: "店铺管理",
          role: ["super", "normal"]
        },
        {
          index: "/Index/dindan",
          foot: "el-icon-menu",
          title: "订单统计",
          role: ["super", "normal"]
        }
      ],
      //  sizeList: ["large"],
      circleUrl: "",
      // 面包屑
      crumbs: ["首页"],
      // 默认选中 选中当前hash
      defaultActive: "",
      account: "请，请登陆",
      // 权限
      role: ""
    };
  },
  // vue 监听路由/hash变化
  watch: {
    $route: {
      handler: function(val) {
        console.log(val.path);
        // 面包屑
        window.__this.indexcrumbs(val.path);
      },
      // 深度观察监听
      deep: true
    }
  },
  // 页面加载初始化
  created() {
    console.log("初始化加载");
    // 怎么拿到当前hash值
    // console.log(this.$route);
    //当前hash
    var hash = this.$route.path;

    this.defaultActive = hash;
    this.indexcrumbs(hash);
    window.__this = this;
    
    API_ADD_checktoken(localStorage.token).then(res => {
      // console.log(res);
      if (res.data.code == 0) {
        this.account = localStorage.account;
        this.role = localStorage.role;
      } else {
        // token无效  就显示请，请登陆
        this.account = "<a href='#/'>请，请登陆<a>";
      }
    });

    API_ADD_accountinfo(localStorage.id).then(res => {
      // console.log(res.data.accountInfo);
      (this.circleUrl = res.data.accountInfo.imgUrl),
        (localStorage.account = res.data.accountInfo.account);
    });
  },
  computed: {
    jurisdiction() {
      var arr = this.tresslist.filter(item => {
        return item.role.includes(this.role);
      });
      return arr;
      // return this.tresslist.filter(item => item.role.includes(this.role));
      // return this.tresslist.filter((item)=>{
      //     item.role.includes(this.role)
      // })
    }
  },
  // 函数
  methods: {
    // 根据hash变化切换面包屑
    indexcrumbs(hash) {
      // 从多个里面选一个值（用什么循环判断val值） 面包屑hash改变  有可能有一个有可能有多个  判断循环
      var arr = [];
      switch (hash) {
        case "/Index/homePage":
          arr = ["首页"];
          break;
        case "/Index/Productlist":
          arr = ["首页", "商品列表"];
          break;
        case "/Index/Categories":
          arr = ["首页", "商品分类"];
          break;
        case "/Index/goods_add":
          arr = ["首页", "商品添加"];
          break;
        case "/Index/tianjiazh":
          arr = ["首页", "添加账号"];
          break;
        case "/Index/xg":
          arr = ["首页", "修改密码"];
          break;
        case "/Index/lb":
          arr = ["首页", "账号列表"];
          break;
        case "/Index/MY":
          arr = ["首页", "个人中心"];
          break;
        case "/Index/management":
          arr = ["首页", "订单管理"];
          break;
        case "/Index/dianpu":
          arr = ["首页", "店铺管理"];
          break;
        case "/Index/dindan":
          arr = ["首页", "订单统计"];
          break;
      }
      this.crumbs = arr;
    },
    // 个人中心
    Personal() {
      this.$router.push("/Index/MY");
    }
  }
};
</script>

<style lang="less" scoped>
.hode {
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  .mbx,
  .el-breadcrumb {
    height: 30px;
    line-height: 30px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .xdc {
    display: flex;
    justify-content: space-between;
    .xsx {
      margin-right: 5px;
    }
  }
}
</style>