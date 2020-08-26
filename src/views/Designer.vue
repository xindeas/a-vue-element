<template>
    <div class="designer view-content" ref="designer">
      <el-steps :active="active" finish-status="finish" process-status="process">
        <template v-for="(item, index) in stepList">
          <el-step :title="item" :key="index" @click.native="handleStepClick(index)" style="cursor: pointer"></el-step>
        </template>
      </el-steps>
      <div class="form-content">
        <el-form ref="form" :model="form" :rules="rules" label-width="auto" :size="form.DEFAULT_COMP_SIZE">
          <el-collapse-transition>
            <div v-if="active==0">
              <el-alert
                title="本配置中所有路由、菜单的路径配置均是存在'@/views/'目录之下，如有特殊要求可以修改‘基础配置’下的‘菜单页面存放目录’一项"
                type="warning"
                :closable="false"
                show-icon>
              </el-alert>
              <el-row>
                <el-divider content-position="left"><span>基础配置</span></el-divider>
                <el-col :span="8">
                  <el-form-item label="系统名称" prop="SYS_NAME">
                    <el-input v-model="form.SYS_NAME"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="组件大小" prop="DEFAULT_COMP_SIZE">
                    <el-select v-model="form.DEFAULT_COMP_SIZE" placeholder="请选择">
                      <el-option label="medium" value="medium"></el-option>
                      <el-option label="small" value="small"></el-option>
                      <el-option label="mini" value="mini"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-tooltip effect="dark" content="项目文件src下的目录，如填写‘views’代表菜单文件存放在src下的views文件夹下">
                    <el-form-item label="菜单页面存放目录" prop="VIEW_PATH">
                      <el-input v-model="form.VIEW_PATH"></el-input>
                    </el-form-item>
                  </el-tooltip>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
          <el-collapse-transition>
            <div v-if="active==1">
              <el-row>
                <el-alert
                  title="本框架路由是由三大部分组成的： 固定标签 + 菜单路由 + 其他路由"
                  type="warning"
                  :closable="false"
                  show-icon>
                </el-alert>
                <el-row>
                  <el-divider content-position="left"><span>路由配置</span></el-divider>
                  <el-col :span="8">
                    <el-form-item label="最大保留标签数" prop="MAX_TAB_NUM">
                      <el-input-number v-model="form.MAX_TAB_NUM" :precision="0" :min="2"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="10">
                    <el-card class="box-card" shadow="hover">
                      <div slot="header" class="clearfix">
                        <span>标签栏固定标签</span>
                      </div>
                      <el-alert
                        title="这些标签无法被关闭并且常驻标签栏，至少需要保留一个固定标签"
                        type="info"
                        :closable="false"
                        show-icon>
                      </el-alert>
                      <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                          type="index">
                        </el-table-column>
                        <el-table-column
                          prop="label"
                          label="标签名"
                          width="180">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.label" :size="form.DEFAULT_COMP_SIZE"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="path"
                          label="路由"
                          width="180">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.path" :size="form.DEFAULT_COMP_SIZE"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="oper"
                          label="操作"
                          width="180">
                          <template slot-scope="scope">
                            <el-button type="danger" :disabled="tableData.length<=1" @click="handleDelRow(scope, 'tableData')" :size="form.DEFAULT_COMP_SIZE" plain>删除</el-button>
                            <el-button type="default" v-if="tableData.length === (scope.$index + 1)" @click="handleAddRow('tableData')" :size="form.DEFAULT_COMP_SIZE" plain>新增</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-card>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="10">
                    <el-card class="box-card" shadow="hover">
                      <div slot="header" class="clearfix">
                        <span>其他路由</span>
                      </div>
                      <el-alert
                        title="既不是固定标签，也不是菜单页面，但是又希望加入路由的页面，例如右上角用户菜单跳转页面"
                        type="info"
                        :closable="false"
                        show-icon>
                      </el-alert>
                      <el-button type="default" @click="handleAddRow('otherRouterData')" :size="form.DEFAULT_COMP_SIZE" plain>新增一行</el-button>
                      <el-table
                        :data="otherRouterData"
                        style="width: 100%">
                        <el-table-column
                          type="index">
                        </el-table-column>
                        <el-table-column
                          prop="label"
                          label="标签名"
                          width="180">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.label" :size="form.DEFAULT_COMP_SIZE"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="path"
                          label="路由"
                          width="180">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.path" :size="form.DEFAULT_COMP_SIZE"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="oper"
                          label="操作"
                          width="180">
                          <template slot-scope="scope">
                            <el-button type="danger" @click="handleDelRow(scope, 'otherRouterData')" :size="form.DEFAULT_COMP_SIZE" plain>删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-card>
                  </el-col>
                </el-row>
              </el-row>
            </div>
          </el-collapse-transition>
          <el-collapse-transition>
            <div v-if="active==2">
              <el-row>
                <el-row>
                  <el-divider content-position="left"><span>菜单权限配置</span></el-divider>
                  <el-col :span="8">
                    <el-form-item label="是否区分权限">
                      <el-switch
                        v-model="usePemission"
                        inactive-text="不区分权限"
                        active-text="区分权限">
                      </el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-collapse-transition>
                  <el-row v-if="!usePemission">
                    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                      <el-card class="box-card" shadow="hover">
                        <div slot="header" class="clearfix">
                          <span>菜单列表</span>
                          <div style="float: right;">
                            <el-button type="default" @click="addChild" :size="form.DEFAULT_COMP_SIZE" plain>添加子节点</el-button>
                            <el-popconfirm
                              title="确定删除吗？"
                              @onConfirm="removeChild"
                            >
                              <el-button slot="reference" type="danger" :size="form.DEFAULT_COMP_SIZE" plain>删除</el-button>
                            </el-popconfirm>
                          </div>
                        </div>
                        <el-alert
                          title="拖拽以进行排序，只允许同层拖拽"
                          type="info"
                          :closable="false"
                          show-icon>
                        </el-alert>
                        <el-tree
                          ref="tree"
                          node-key="id"
                          :data="treeData"
                          default-expand-all
                          @node-click="handleNodeClick"
                          :allow-drag="allowDrag"
                          :allow-drop="allowDrop"
                          :expand-on-click-node="false"
                          highlight-current
                          draggable
                          accordion></el-tree>
                      </el-card>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" v-if="curTreeNode.label || curTreeNode.path">
                      <el-row>
                        <el-divider content-position="left"><span>当前菜单</span></el-divider>
                        <el-col :span="8">
                          <el-form-item label="菜单名称" required>
                            <el-input v-model="curTreeNode.label" placeholder="必填项"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="菜单路径">
                            <el-input v-model="curTreeNode.path" placeholder="必填项，以' / '开头"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="菜单图标">
                            <el-input v-model="curTreeNode.icon" placeholder="class图标，一级菜单建议必填"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="唯一标识" required>
                            <el-input v-model="curTreeNode.id" placeholder="唯一标识"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="打开路径" required>
                            <el-input v-model="curTreeNode.paths" placeholder="菜单的打开路径，以逗号分隔"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-alert
                    title="区分权限需要在router.beforeEach进行角色判断，查询出所有有访问权限的菜单然后给vuex的permissionList赋值，数据格式参考MENU_LIST"
                    type="warning"
                    :closable="false"
                    show-icon v-else>
                  </el-alert>
                </el-collapse-transition>
              </el-row>
            </div>
          </el-collapse-transition>
          <el-collapse-transition>
            <div v-if="active==3">
              <el-row>
                <el-divider content-position="left"><span>用户菜单配置</span></el-divider>
                <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
                  <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                      <span>右上角头像下拉菜单</span>
                    </div>
                    <el-alert
                      title="使用的组件是element-ui的dropdownlist，指令对应command属性，具体操作前往'@/layout/TopBar/TopBar.vue'修改"
                      type="info"
                      :closable="false"
                      show-icon>
                    </el-alert>
                    <el-table
                      :data="dropList"
                      style="width: 100%">
                      <el-table-column
                        type="index">
                      </el-table-column>
                      <el-table-column
                        prop="label"
                        label="标签名"
                        width="180">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.label" :size="form.DEFAULT_COMP_SIZE"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="command"
                        label="指令"
                        width="180">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.command" :size="form.DEFAULT_COMP_SIZE"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="style"
                        label="额外样式"
                        width="180">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.style" :size="form.DEFAULT_COMP_SIZE"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="divided"
                        label="是否显示分隔线"
                        width="180">
                        <template slot-scope="scope">
                          <el-switch
                            v-model="scope.row.divided"
                            inactive-text="否"
                            active-text="是"
                            :size="form.DEFAULT_COMP_SIZE">
                          </el-switch>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="oper"
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                          <el-button type="danger" :disabled="dropList.length<=1" @click="handleDelRow(scope, 'dropList')" :size="form.DEFAULT_COMP_SIZE" plain>删除</el-button>
                          <el-button type="default" v-if="dropList.length === (scope.$index + 1)" @click="handleAddRow('dropList')" :size="form.DEFAULT_COMP_SIZE" plain>新增</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-collapse-transition>
        </el-form>
      </div>
      <div class="btn-bar">
        <el-button @click="nextStep(false)" :disabled="active <= 0" plain>上一步</el-button>
        <el-button @click="nextStep(true)" :disabled="active >= this.stepList.length - 1" plain>下一步</el-button>
        <el-button type="success" icon="el-icon-download" @click="exportConfig" plain>导出</el-button>
        <el-popconfirm
          title="确定还原吗？"
          @onConfirm="resetData"
        >
          <el-button slot="reference" type="danger" icon="el-icon-refresh" plain>还原</el-button>
        </el-popconfirm>
      </div>
    </div>
</template>

<script>
import {
  Alert,
  Button,
  Card,
  Col,
  CollapseTransition,
  Divider,
  Form,
  FormItem,
  Input,
  InputNumber,
  Option,
  Popconfirm,
  Popover,
  Row,
  Select,
  Switch,
  Table,
  TableColumn,
  Tree,
  Tooltip,
  Steps,
  Step,
  MessageBox
} from 'element-ui'
import * as cons from '@/utils/const.js'
export default {
  name: 'Designer',
  components: {
    'el-form': Form,
    'el-form-item': FormItem,
    'el-input': Input,
    'el-input-number': InputNumber,
    'el-button': Button,
    'el-select': Select,
    'el-option': Option,
    'el-row': Row,
    'el-col': Col,
    'el-divider': Divider,
    'el-switch': Switch,
    'el-tree': Tree,
    'el-card': Card,
    'el-alert': Alert,
    'el-popconfirm': Popconfirm,
    'el-popover': Popover,
    'el-table': Table,
    'el-table-column': TableColumn,
    'el-collapse-transition': CollapseTransition,
    'el-tooltip': Tooltip,
    'el-steps': Steps,
    'el-step': Step
  },
  data: function () {
    return this.defaultData()
  },
  computed: {
    rules: function () {
      let rules = {}
      for (let item in this.form) {
        rules[item] = [{
          required: true, message: '不能为空', trigger: 'change'
        }]
      }
      return rules
    }
  },
  watch: {
    'form.DEFAULT_ROUTER': function (val) {
      if (!val.startsWith('/')) {
        this.form.DEFAULT_ROUTER = '/' + val
      }
      this.form.DEFAULT_ROUTER_ITEM.path = val
    },
    'form.DEFAULT_ROUTER_ITEM': function (val) {
      this.form.DEFAULT_RECENT_ROUTERS = [val]
    },
    'curTreeNode.path': function (val) {
      if (val && !val.startsWith('/')) {
        this.curTreeNode.path = '/' + val
      }
    }
  },
  methods: {
    handleStepClick: function (item) {
      this.active = item
    },
    nextStep: function (nextFlag) {
      if (nextFlag) {
        this.active = this.active >= this.stepList.length - 1 ? this.active : this.active + 1
      } else {
        this.active = this.active <= 0 ? this.active : this.active - 1
      }
    },
    defaultData: function () {
      const form = JSON.parse(JSON.stringify(cons))
      return {
        form: {
          ...form
        },
        treeData: [{
          label: '所有菜单',
          children: form.MENU_LIST
        }],
        stepList: [
          '基础配置',
          '路由配置',
          '菜单权限',
          '其他菜单'
        ],
        active: 0,
        usePemission: false,
        curTreeNode: {},
        tableData: form.DEFAULT_RECENT_ROUTERS,
        otherRouterData: form.OTHER_ROUTER_LIST,
        dropList: form.USER_INFO_DROPDOWN
      }
    },
    resetData: function () {
      const data = this.defaultData()
      for (let key in data) {
        this[key] = data[key]
      }
    },
    handleNodeClick: function (data) {
      this.curTreeNode = data
    },
    addChild: function () {
      if (!this.curTreeNode.label) {
        return MessageBox.alert('请选择节点', '提示', {
          confirmButtonText: '确定'
        })
      }
      let data = {
        label: '新增节点',
        path: 'newNode',
        id: 'newNode',
        parentPaths: this.curTreeNode.paths,
        paths: this.curTreeNode.paths + ',新增节点'
      }
      this.$refs.tree.append(data, this.curTreeNode.id)
    },
    removeChild: function () {
      if (!this.curTreeNode.label) {
        return MessageBox.alert('请选择节点', '提示', {
          confirmButtonText: '确定'
        })
      }
      this.$refs.tree.remove(this.curTreeNode.id)
    },
    allowDrag: function (node) {
      return node.level > 1
    },
    allowDrop: function (draggingNode, dropNode, type) {
      if (draggingNode.level !== dropNode.level || type === 'inner') {
        return false
      }
      return true
    },
    handleAddRow: function (table) {
      this[table].push({})
    },
    handleDelRow: function (scope, table) {
      this[table].splice(scope.$index, 1)
    },
    exportConfig: function () {
      const vm = this
      this.form.DEFAULT_ROUTER = this.form.DEFAULT_RECENT_ROUTERS[0].path
      this.form.DEFAULT_ROUTER_ITEM = this.form.DEFAULT_RECENT_ROUTERS[0]
      let text = ''
      for (let item of Object.keys(this.form)) {
        text += 'export const ' + item + ' = '
        if (typeof this.form[item] === 'string') {
          text += "'" + this.form[item] + "'"
        } else if (typeof this.form[item] === 'number') {
          text += JSON.stringify(this.form[item])
        } else if (typeof this.form[item] === 'object') {
          text += JSON.stringify(this.form[item])
        }
        text += '\n'
      }
      text = text.replace(/"/g, `'`)
      text = text.replace(/,{/g, `, {`)
      text = text.replace(/,\[/g, `, [`)
      text = text.replace(/,'/g, `, '`)
      text = text.replace(/:/g, `: `)
      this.$copyText(text).then(function (e) {
        vm.$msgbox.alert(`复制成功,请将内容粘贴覆盖至'@/utils/const.js'`, '提示')
      }, function (e) {
        vm.$notify.error({
          title: '提示',
          message: '出错'
        })
      })
    }
  }
}
</script>

<style scoped>
  .designer {
    position: relative;
  }
  .designer .form-content {
    width: 100%;
    height: calc(100% - 100px);
    overflow-y: auto;
  }
  .el-select {
    width: 100%;
  }
  .el-input-number {
    width: 100%;
  }
  .el-divider span {
    font-size: 1.5em;
    font-weight: 700;
  }
  .el-card {
    overflow: auto;
  }
  .btn-bar {
    position: absolute;
    width: calc(100% - 2em);
    box-sizing: border-box;
    bottom: 0;
    text-align: center;
    margin-top: 1em;
  }
  .el-table {
    overflow: auto;
  }
  .el-card {
    margin-bottom: 1em;
  }
</style>
