<template>
  <div class="home">
    <div class="banxin">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-col :span="24">
            <el-form-item label="手机号" prop="mobile">
              <el-input
                v-model="formData.mobile"
                placeholder="请输入手机号"
                :maxlength="11"
                show-word-limit
                clearable
                prefix-icon="el-icon-mobile"
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="多行文本" prop="field101">
              <el-input
                v-model="formData.field101"
                type="textarea"
                placeholder="请输入多行文本"
                :autosize="{minRows: 4, maxRows: 4}"
                :style="{width: '100%'}"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="下拉选择" prop="field103">
              <el-select
                v-model="formData.field103"
                placeholder="请选择下拉选择"
                clearable
                :style="{width: '100%'}"
              >
                <el-option
                  v-for="(item, index) in field103Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间选择" prop="field104">
              <el-time-picker
                v-model="formData.field104"
                format="HH:mm:ss"
                value-format="HH:mm:ss"
                :picker-options="{'selectableRange':'00:00:00-23:59:59'}"
                :style="{width: '100%'}"
                placeholder="请选择时间选择"
                clearable
              ></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="级联选择" prop="field105">
              <el-cascader
                v-model="formData.field105"
                :options="field105Options"
                :props="field105Props"
                :style="{width: '100%'}"
                placeholder="请选择级联选择"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="时间范围" prop="field107">
              <el-time-picker
                v-model="formData.field107"
                is-range
                format="HH:mm:ss"
                value-format="HH:mm:ss"
                :style="{width: '100%'}"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                range-separator="至"
                clearable
              ></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评分" prop="field108">
              <el-rate v-model="formData.field108"></el-rate>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开关" prop="field112" required>
              <el-switch v-model="formData.field112"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="计数器" prop="field113">
              <el-input-number v-model="formData.field113" placeholder="计数器"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="上传" prop="field109" required>
              <el-upload
                ref="field109"
                :file-list="field109fileList"
                :action="field109Action"
                :before-upload="field109BeforeUpload"
                list-type="picture"
              >
                <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        mobile: "",
        field101: undefined,
        field103: undefined,
        field104: null,
        field105: [],
        field107: null,
        field108: 0,
        field112: false,
        field113: undefined,
        field109: null,
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        field101: [
          {
            required: true,
            message: "请输入多行文本",
            trigger: "blur",
          },
        ],
        field103: [
          {
            required: true,
            message: "请选择下拉选择",
            trigger: "change",
          },
        ],
        field104: [
          {
            required: true,
            message: "请选择时间选择",
            trigger: "change",
          },
        ],
        field105: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个field105",
            trigger: "change",
          },
        ],
        field107: [
          {
            required: true,
            message: "时间范围不能为空",
            trigger: "change",
          },
        ],
        field108: [
          {
            required: false,
            message: "评分不能为空",
            trigger: "change",
          },
        ],
        field113: [
          {
            required: true,
            message: "计数器",
            trigger: "blur",
          },
        ],
      },
      field109Action: "https://jsonplaceholder.typicode.com/posts/",
      field109fileList: [],
      field103Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      field105Options: [],
      field105Props: {
        multiple: false,
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    getField105Options() {
      // TODO 发起请求获取数据
      this.field105Options;
    },
    field109BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
  },
};
</script>
<style lang="scss">
.home {
  background-color: #fff;
  min-height: 100%;
  padding-top: 50px;
  .banxin{
    width: 700px;
    margin: 0 auto;
  }
  .el-rate {
    display: inline-block;
    vertical-align: text-top;
  }

  .el-upload__tip {
    line-height: 1.2;
  }
}
</style>
