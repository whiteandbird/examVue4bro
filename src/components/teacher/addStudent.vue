<!-- 添加学生 -->
<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="tel">
        <el-input v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input v-model="form.cardId"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="form.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button type="text" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: { //表单数据初始化
        userName: null,
        tel: null,
        email: null,
        pwd: null,
        cardId: null,
        sex: null,
        role: 1
      },
      rules:{
        userName:[
         { required: true, message: '请输入用户名字', trigger: 'blur' },
         { max: 20, message:'长度不能超过20个字符', trigger:'change'}
        ],
        sex:[
          {required: true, message: '请输入用户性别', trigger:'blur'},
          {max:2 , message:'长度不能超过两个字符', trigger:'change'}
        ],
        tel:[
          {required: true, message: '请输入用户手机号', trigger:'blur'},
          {validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("手机号格式错误"));
              } else {
                callback();
              }
            },trigger:'change'}
        ],
        pwd:[
          {required: true, message:'请输入用户密码', trigger:'blur'},
          {max:16, message:'用户密码不能超过16位', trigger:'change'}
        ]
      }

    };
  },
  
  methods: {
    onSubmit() { //数据提交
      this.$refs.form.validate((valid)=>{
        if(valid){
            this.$axios({
            url: '/student',
            method: 'post',
            data: {
              ...this.form
            }
          }).then(res => {
            if(res.data.code == 200) {
              this.$message({
                message: '数据添加成功',
                type: 'success'
              })
              this.$router.push({path: '/studentManage'})
            }
          })
        }else{
          return false;
            }
      })
    },
    cancel() { //取消按钮
      this.form = {}
    },
    
  }
};
</script>
<style lang="scss" scoped>
.add {
  padding: 0px 40px;
  width: 400px;
}
</style>

