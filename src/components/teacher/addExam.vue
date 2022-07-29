<!-- 添加考试 -->
<template>
  <section class="add">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="试卷名称" prop="source">
        <el-input v-model="form.source"></el-input>
      </el-form-item>
      <el-form-item label="介绍" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="考试日期" prop="examDate">
        <el-col :span="14">
          <el-date-picker placeholder="选择日期" v-model="form.examDate" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="持续时间(分钟)" prop="totalTime">
        <el-input v-model.number="form.totalTime"></el-input>
      </el-form-item>
      <el-form-item label="总分" prop="totalScore">
        <el-input v-model.number="form.totalScore"></el-input>
      </el-form-item>
      <el-form-item label="考试类型" prop="type">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="考生提示" prop="tips">
        <el-input type="textarea" v-model="form.tips"></el-input>
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
    // var checkNum = (rule, value, callback) => {
    //     if (!value) {
    //       return callback(new Error('输入不能为空'));
    //     }
    //     setTimeout(() => {
    //       if (!Number.isInteger(value)) {
    //         callback(new Error('请输入数字值'));
    //       } else {
    //         if (value < 18) {
    //           callback(new Error('必须年满18岁'));
    //         } else {
    //           callback();
    //         }
    //       }
    //     }, 1000);
    //   };

    return {
       
      form: { //表单数据初始化
        source: null,
        description: null,
        examDate: null,
        totalTime: null,
        totalScore: null,
        type: null,
        tips: null,
        paperId: null,
      },
      rules:{
      source:[
         { required: true, message: '请输入试卷名称', trigger: 'blur' },
         { max: 20, message:'长度不能超过20个字符', trigger:'change'}
      ],
      description:[
        { required: true, message:'请输入介绍',trigger:'blur'},
        { max: 50, message:'长度不能超过五十个字符', trigger:'change'}
      ],
      examDate:[
         { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      ],
      totalTime:[
         { required: true, message: '持续时间不能为空'},
         { type: 'number', message: '持续时间必须为数字值'}
      ],
      totalScore:[
         { required: true, message: '总分不能为空'},
         { type: 'number', message: '总分必须为数字值'}
      ]
  },
    };
    
  },
 
  methods: {
    formatTime(date) { //日期格式化
    console.log(date)
      var date= new Date(Date.parse(date));
      let year = date.getFullYear()
      let month= date.getMonth()+ 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let day=date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours=date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes=date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds=date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },
    onSubmit() {
      var pass = true;
      this.$refs['form'].validate((valid)=>{
        if(!valid){
          this.$message({
            type:'warning',
            message:'请填写必要数据'
          })
          pass = false;
          return false;
        }
      });
      if(!pass){
        return;
      }
      let examDate = this.formatTime(this.form.examDate)
      this.form.examDate = examDate.substr(0,10)
        this.$axios(`/examManagePaperId`).then(res => {
        this.form.paperId = res.data.data.paperId + 1 //实现paperId自增1
        this.$axios({
          url: '/exam',
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
            this.$router.push({path: '/selectExam'})
          }
        })
      })
      // this.$axios(`/api/examManagePaperId`).then(res => {
      //   this.form.paperId = res.data.data.paperId + 1 //实现paperId自增1
      //   this.$axios({
      //     url: '/api/exam',
      //     method: 'post',
      //     data: {
      //       ...this.form
      //     }
      //   }).then(res => {
      //     if(res.data.code == 200) {
      //       this.$message({
      //         message: '数据添加成功',
      //         type: 'success'
      //       })
      //       this.$router.push({path: '/selectExam'})
      //     }
      //   })
      // })
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

