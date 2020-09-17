document.write(
  " <script language=javascript src='https://cdn.jsdelivr.net/npm/dsbridge/dist/dsbridge.js'></script>"
)

window.app = {
  closePage(obj) {
    dsBridge.call('monitor.close', function (ret) {
      parseResult(ret, obj)
    })
  },
  exit(obj){
    dsBridge.call('monitor.exit',function (ret) {
      parseResult(ret, obj)
    })
  },
  openDetail(obj){
    dsBridge.call('monitor.openDetail',obj,function (ret) {
      parseResult(ret, obj)
    })
  }

}

function parseResult(ret, obj) {
  var retObj = JSON.parse(ret)
  console.log(ret)
  if (obj.success && retObj.code == 0) {
    obj.success(retObj.result)
    if (obj.complete) {
      obj.complete()
    }
  } else if (obj.fail && retObj.code == 1) {
    obj.fail(retObj.errMsg)
    if (obj.complete) {
      obj.complete()
    }
  } else if (obj.cancel && retObj.code == 2) {
    obj.cancel(retObj.errMsg)
  } else if (obj.trigger && retObj.code == 3) {
    obj.trigger()
  } else if (obj.start && retObj.code == 4) {
    obj.start(retObj.result)
  } else if (obj.taskPre && retObj.code == 10) {
    obj.taskPre(retObj.errMsg)
  } else if (obj.taskStart && retObj.code == 11) {
    obj.taskStart(retObj.result)
  } else if (obj.taskCancel && retObj.code == 12) {
    obj.taskCancel(retObj.errMsg)
  } else if (obj.taskRunning && retObj.code == 13) {
    obj.taskRunning(retObj.result)
  } else if (obj.taskComplete && retObj.code == 14) {
    obj.taskComplete(retObj.result)
  } else if (obj.taskFail && retObj.code == 15) {
    obj.taskFail(retObj.errMsg)
  }
}