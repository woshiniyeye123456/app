document.write(" <script language=javascript src='https://cdn.jsdelivr.net/npm/dsbridge/dist/dsbridge.js'></script>");
window.gsmdp = {
  getSystemInfo(obj) {
    dsBridge.call("getSystemInfo", function (ret) {
      parseResult(ret, obj)
    });
  },
   makePhoneCall(obj) {
      dsBridge.call("device.makePhoneCall", obj.phoneNumber, function (ret) {
        parseResult(ret, obj)
      });
   },
  showToast(obj) {
    dsBridge.call("ui.showToast", obj, function (ret) {
      parseResult(ret, obj)
    });
  },
  showModal(obj) {
    dsBridge.call("ui.showModal", obj, function (ret) {
      parseResult(ret, obj)
    });
  },
  showLoading(obj) {
    dsBridge.call("ui.showLoading", obj, function (ret) {
      parseResult(ret, obj)
    });
  },
  hideLoading(obj) {
    dsBridge.call("ui.hideLoading", function (ret) {
      parseResult(ret, obj)
    });
  },
  onNetworkStatusChange(obj) {
    dsBridge.call("device.onNetworkStatusChange", function (ret) {
      parseResult(ret, obj)
    });
  },
  sendMessage(obj) {
    dsBridge.call("device.sendMessage", obj.data, function (ret) {
      parseResult(ret, obj)
    });
  },
  addPhoneContact(obj) {
    dsBridge.call("device.addPhoneContact", obj.data, function (ret) {
      parseResult(ret, obj)
    });
  },
  getLocation(obj) {
    dsBridge.call("device.getLocation", obj.data, function (ret) {
      parseResult(ret, obj)
    });
  },
  request(obj) {
    dsBridge.call("netWork.request", obj.data, function (ret) {
      parseResult(ret, obj)
    });
  },
  abort(obj) {
    dsBridge.call("netWork.abort", obj.data, function (ret) {
      parseResult(ret, obj)
    });
  },
  chooseImage(obj) {
    dsBridge.call("media.chooseImage", obj.key, function (ret) {
      parseResult(ret, obj)
    });
  },
  getLocalImgData(obj) {
    dsBridge.call("media.getLocalImgData", obj.localId, function (ret) {
      parseResult(ret, obj)
    });
  },
  /*数据缓存相关的API*/
  setStorage(obj) {
    dsBridge.call("storage.setStorage", obj, function (ret) {
      parseResult(ret, obj)
    });
  },
  getStorage(obj) {
    dsBridge.call("storage.getStorage", obj.key, function (ret) {
      parseResult(ret, obj)
    });
  },
  removeStorage(obj) {
    dsBridge.call("storage.removeStorage", obj.key, function (ret) {
      parseResult(ret, obj)
    });
  },
  clearStorage(obj) {
    dsBridge.call("storage.clearStorage", function (ret) {
      parseResult(ret, obj)
    });
  },
  /*数据缓存相关的API*/

  /* 文件相关的API */
  saveFile(obj) {
    dsBridge.call("file.saveFile", obj, function (ret) {
      parseResult(ret, obj)
    });
  },
  removeSavedFile(obj) {
    dsBridge.call("file.removeSavedFile", obj.filePath, function (ret) {
      parseResult(ret, obj)
    });
  },
  openDocument(obj) {
    dsBridge.call("file.openDocument", obj, function (ret) {
      parseResult(ret, obj)
    });
  },
  getSavedFileInfo(obj) {
    dsBridge.call("file.getSavedFileInfo", obj.filePath, function (ret) {
      parseResult(ret, obj)
    });
  },
  /* 文件相关的API */

  previewImage(obj) {
      dsBridge.call("media.previewImage", obj.key,  function (ret) {
        parseResult(ret, obj)
      });
    },
    chooseVideo(obj) {
      dsBridge.call("media.chooseVideo", obj.key,  function (ret) {
        parseResult(ret, obj)
      });
    },
  downloadFile(obj) {
      dsBridge.call("fileTransfer.downloadFile", obj.key,  function (ret) {
        parseResult(ret, obj)
      });
    },

  startRecord(obj) {
      dsBridge.call("media.startRecord",  function (ret) {
        parseResult(ret,obj)
      });
    },
 stopRecord(obj) {
      dsBridge.call("media.stopRecord",  function (ret) {
        parseResult(ret,obj)
      });
    },
 playVoice(obj) {
      dsBridge.call("media.playVoice",  obj.localId, function (ret) {
        parseResult(ret,obj)
      });
    },
 pauseVoice(obj) {
       dsBridge.call("media.pauseVoice",  obj.localId, function (ret) {
         parseResult(ret,obj)
       });
     },
 stopVoice(obj) {
     dsBridge.call("media.stopVoice",  obj.localId, function (ret) {
       parseResult(ret,obj)
     });
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
  } else if(obj.start && retObj.code == 4){
    obj.start(retObj.result)
  } else if(obj.taskPre && retObj.code == 10){
    obj.taskPre(retObj.errMsg)
  } else if(obj.taskStart && retObj.code == 11){
    obj.taskStart(retObj.result)
  } else if(obj.taskCancel && retObj.code == 12){
    obj.taskCancel(retObj.errMsg)
  } else if(obj.taskRunning && retObj.code == 13){
    obj.taskRunning(retObj.result)
  } else if(obj.taskComplete && retObj.code == 14){
    obj.taskComplete(retObj.result)
  } else if(obj.taskFail && retObj.code == 15){
    obj.taskFail(retObj.errMsg)
  }
}