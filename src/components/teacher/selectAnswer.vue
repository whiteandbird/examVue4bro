//查询所有题库
<template>


  <div class="exam">
    <!-- <div> -->
    <!-- <el-button type="text" @click="dialogVisible = true">编辑</el-button> -->
 
    <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="问题">
            <el-input v-model="form.question" label="aa"></el-input>
        </el-form-item>
        <el-form-item label="选项A">
         <el-input v-model="form.answerA"></el-input>
        </el-form-item>
        <el-form-item label="选项B">
         <el-input v-model="form.answerB"></el-input>
        </el-form-item>
        <el-form-item label="选项C">
         <el-input v-model="form.answerC"></el-input>
        </el-form-item>
       <el-form-item label="选项D">
         <el-input v-model="form.answerD"></el-input>
        </el-form-item>
        <el-form-item label="答案">
         <el-input v-model="form.rightAnswer"></el-input>
        </el-form-item>
        <el-form-item label="解析">
          <el-input v-model="form.analysis"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate(form.questionId)">确 定</el-button>
      </span>
    </el-dialog>
  <!-- </div> -->
    <el-table :data="pagination.records" border :row-class-name="tableRowClassName">
      <el-table-column fixed="left" prop="subject" label="试卷名称" width="180"></el-table-column>
      <el-table-column prop="question" label="题目信息" width="490"></el-table-column>
      <el-table-column prop="section" label="所属章节" width="200"></el-table-column>
      <el-table-column prop="type" label="题目类型" width="200"></el-table-column>
      <el-table-column prop="score" label="试题分数" width="150"></el-table-column>
      <el-table-column prop="level" label="难度等级" width="133"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row.questionId,scope.row.questionType)" type="primary" size="small" width='50px'>编辑题目</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current"
      :page-sizes="[6, 10]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      class="page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentType: '',// 当前正在操作类型的type
      dialogVisible:false,
      form: {
        analysis: '',
        answerA:'sf',
        answerA: '',
        answerC:'',
        answerD:'',
        level:'',
        question:'',
        type:''
      },
      pagination: {
        //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6 //每页条数
      }
    };
  },
  created() {
    this.getAnswerInfo();
  },
  methods: {
    getAnswerInfo() {
      //分页查询所有试卷信息
      this.$axios(
        `/answers/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => {
          this.pagination = res.data.data;
          console.log(res);
        })
        .catch(error => {});
    },
    edit(questionId, questionType){
      console.log(questionId, questionType)
      this.currentType = questionType
     
      this.dialogVisible = true;
      if(questionType==1){
        // 选择题
         this.$axios({ 
            url: '/findQuestionById',
            method: 'Post',
            headers: { 'content-type': 'application/json' },
            data:{
              'questionId': questionId
            }
          })
        .then(res => {
          console.log("=========回显====================")
          console.log(res)
          this.form = res.data.data
          console.log(this.form);
        })
        .catch(error => {
          console.log("==========eror",error)
        });
      }
    },
    confirmUpdate(questionId){
      console.log(questionId)
      this.dialogVisible = false;

    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getAnswerInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getAnswerInfo();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.exam {
  padding: 0px 40px;
  .page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edit {
    margin-left: 20px;
  }
  .el-table tr {
    background-color: #DD5862 !important;
  }
}
  .el-table .warning-row {
    background: #000 !important;
    
  }

  .el-table .success-row {
    background: #DD5862;
  }

</style>
