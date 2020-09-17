document.write(
  " <script language=javascript src='https://cdn.jsdelivr.net/npm/dsbridge/dist/dsbridge.js'></script>"
)
window.gsmdp = {
  goBack(obj) {
    dsBridge.call('goBack', function (ret) {
      parseResult(ret, obj)
    })
  },
  getSystemInfo(obj) {
    dsBridge.call('getSystemInfo', function (ret) {
      parseResult(ret, obj)
    })
  },
  makePhoneCall(obj) {
    dsBridge.call('device.makePhoneCall', obj.phoneNumber, function (ret) {
      parseResult(ret, obj)
    })
  },
  showToast(obj) {
    dsBridge.call('ui.showToast', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  showModal(obj) {
    dsBridge.call('ui.showModal', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  showLoading(obj) {
    dsBridge.call('ui.showLoading', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  hideLoading(obj) {
    dsBridge.call('ui.hideLoading', function (ret) {
      parseResult(ret, obj)
    })
  },
  onNetworkStatusChange(obj) {
    dsBridge.call('device.onNetworkStatusChange', function (ret) {
      parseResult(ret, obj)
    })
  },
  sendMessage(obj) {
    dsBridge.call('device.sendMessage', obj.data, function (ret) {
      parseResult(ret, obj)
    })
  },
  addPhoneContact(obj) {
    dsBridge.call('device.addPhoneContact', obj.data, function (ret) {
      parseResult(ret, obj)
    })
  },
  getLocation(obj) {
    dsBridge.call('device.getLocation', obj.data, function (ret) {
      parseResult(ret, obj)
    })
  },
  request(obj) {
    dsBridge.call('netWork.request', obj.data, function (ret) {
      parseResult(ret, obj)
    })
  },
  abort(obj) {
    dsBridge.call('netWork.abort', obj.data, function (ret) {
      parseResult(ret, obj)
    })
  },
  chooseImage(obj) {
    dsBridge.call('media.chooseImage', obj.key, function (ret) {
      parseResult(ret, obj)
    })
  },
  getLocalImgData(obj) {
    dsBridge.call('media.getLocalImgData', obj.localId, function (ret) {
      parseResult(ret, obj)
    })
  },
  /*数据缓存相关的API*/
  setStorage(obj) {
    dsBridge.call('storage.setStorage', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  getStorage(obj) {
    dsBridge.call('storage.getStorage', obj.key, function (ret) {
      parseResult(ret, obj)
    })
  },
  removeStorage(obj) {
    dsBridge.call('storage.removeStorage', obj.key, function (ret) {
      parseResult(ret, obj)
    })
  },
  clearStorage(obj) {
    dsBridge.call('storage.clearStorage', function (ret) {
      parseResult(ret, obj)
    })
  },
  /*数据缓存相关的API*/

  /* 文件相关的API */
  saveFile(obj) {
    dsBridge.call('file.saveFile', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  removeSavedFile(obj) {
    dsBridge.call('file.removeSavedFile', obj.filePath, function (ret) {
      parseResult(ret, obj)
    })
  },
  copyFile(obj) {
      dsBridge.call('file.copyFile', obj, function (ret) {
        parseResult(ret, obj)
      })
    },
  chooseFile(obj) {
    dsBridge.call('file.chooseFile', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  openDocument(obj) {
    dsBridge.call('file.openDocument', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  openDocument2(obj) {
    dsBridge.call('file.openDocument2', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  getSavedFileInfo(obj) {
    dsBridge.call('file.getSavedFileInfo', obj.filePath, function (ret) {
      parseResult(ret, obj)
    })
  },
  /* 文件相关的API */



  getAssetDirectory(obj) {
    dsBridge.call('directory.getAssetDirectory', obj, function (ret) {
      parseResult(ret, obj)
    })
  },

  getDataDirectory(obj) {
    dsBridge.call('directory.getDataDirectory', obj, function (ret) {
      parseResult(ret, obj)
    })
  },

  getFileDirectory(obj) {
    dsBridge.call('directory.getFileDirectory', obj, function (ret) {
      parseResult(ret, obj)
    })
  },

  getCacheDirectory(obj) {
    dsBridge.call('directory.getCacheDirectory', obj, function (ret) {
      parseResult(ret, obj)
    })
  },

  getExternalApplicationStorageDirectory(obj) {
    dsBridge.call('directory.getExternalApplicationStorageDirectory', obj, function (ret) {
      parseResult(ret, obj)
    })
  },

  getExternalDataDirectory(obj) {
    dsBridge.call('directory.getExternalDataDirectory', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  getExternalCacheDirectory(obj) {
    dsBridge.call('directory.getExternalCacheDirectory', obj, function (ret) {
      parseResult(ret, obj)
    })
  },

  getExternalRootDirectory(obj) {
    dsBridge.call('directory.getExternalRootDirectory', obj, function (ret) {
      parseResult(ret, obj)
    })
  },




  previewImage(obj) {
    dsBridge.call('media.previewImage', obj.key, function (ret) {
      parseResult(ret, obj)
    })
  },
    previewVideo(obj) {
      dsBridge.call('media.previewVideo', obj.videoPath, function (ret) {
        parseResult(ret, obj)
      })
    },
  chooseVideo(obj) {
    dsBridge.call('media.chooseVideo', obj.key, function (ret) {
      parseResult(ret, obj)
    })
  },
  downloadFile(obj) {
    dsBridge.call('fileTransfer.downloadFile', obj.key, function (ret) {
      parseResult(ret, obj)
    })
  },

  startRecord(obj) {
    dsBridge.call('media.startRecord', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  stopRecord(obj) {
    dsBridge.call('media.stopRecord', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  playVoice(obj) {
    dsBridge.call('media.playVoice', obj.localId, function (ret) {
      parseResult(ret, obj)
    })
  },
  pauseVoice(obj) {
    dsBridge.call('media.pauseVoice', obj.localId, function (ret) {
      parseResult(ret, obj)
    })
  },
  stopVoice(obj) {
    dsBridge.call('media.stopVoice', obj.localId, function (ret) {
      parseResult(ret, obj)
    })
  },
  onVoicePlayEnd(obj) {
    dsBridge.call('media.onVoicePlayEnd', function (ret) {
      parseResult(ret, obj)
    })
  },
  onVoiceRecordEnd(obj) {
    dsBridge.call('media.onVoiceRecordEnd', function (ret) {
      parseResult(ret, obj)
    })
  },

  /* 推送相关的API */

  getDeviceId(obj) {
    dsBridge.call('push.getDeviceId', function (ret) {
      parseResult(ret, obj)
    })
  },

  turnOnPushChannel(obj) {
    dsBridge.call('push.turnOnPushChannel', function (ret) {
      parseResult(ret, obj)
    })
  },
  turnOffPushChannel(obj) {
    dsBridge.call('push.turnOffPushChannel', function (ret) {
      parseResult(ret, obj)
    })
  },
  checkPushChannelStatus(obj) {
    dsBridge.call('push.checkPushChannelStatus', function (ret) {
      parseResult(ret, obj)
    })
  },
  bindAccount(obj) {
    dsBridge.call('push.bindAccount', obj.account, function (ret) {
      parseResult(ret, obj)
    })
  },

  unbindAccount(obj) {
    dsBridge.call('push.unbindAccount', function (ret) {
      parseResult(ret, obj)
    })
  },
  bindTag(obj) {
    dsBridge.call('push.bindTag', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  unbindTag(obj) {
    dsBridge.call('push.unbindTag', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  listTags(obj) {
    dsBridge.call('push.listTags', obj, function (ret) {
      parseResult(ret, obj)
    })
  },

  addAlias(obj) {
    dsBridge.call('push.addAlias', obj.alias, function (ret) {
      parseResult(ret, obj)
    })
  },
  removeAlias(obj) {
    dsBridge.call('push.removeAlias', obj.alias, function (ret) {
      parseResult(ret, obj)
    })
  },
  setNotificationSound(obj) {
    dsBridge.call('push.setNotificationSound', obj.path, function (ret) {
      parseResult(ret, obj)
    })
  },
  setNotificationLargeIcon(obj) {
    dsBridge.call('push.setNotificationLargeIcon', obj.path, function (ret) {
      parseResult(ret, obj)
    })
  },
  setDoNotDisturb(obj) {
    dsBridge.call('push.setDoNotDisturb', obj, function (ret) {
      parseResult(ret, obj)
    })
  },
  closeDoNotDisturbMode(obj) {
    dsBridge.call('push.closeDoNotDisturbMode', function (ret) {
      parseResult(ret, obj)
    })
  },
  clearNotifications(obj) {
    dsBridge.call('push.clearNotifications', function (ret) {
      parseResult(ret, obj)
    })
  },
  bindPhoneNumber(obj) {
    dsBridge.call('push.bindPhoneNumber', obj.phoneNumber, function (ret) {
      parseResult(ret, obj)
    })
  },
  unbindPhoneNumber(obj) {
    dsBridge.call('push.unbindPhoneNumber', function (ret) {
      parseResult(ret, obj)
    })
  },

    getGooglePushToken(obj) {
      dsBridge.call('googlepush.getGooglePushToken', function (ret) {
        parseResult(ret, obj)
      })
    },
   registerOnGoogleMessage(obj) {
      dsBridge.register('onGoogleMessage', function (msg) {
        console.log('onGoogleMessage'+msg)
        obj.onGoogleMessage(msg)
      })
    },
  registerOnMessage(obj) {
    dsBridge.register('onMessage', function (msg) {
      console.log(msg)
      obj.onMessage(msg)
    })
  },
  registerOnNotificationOpened(obj) {
    dsBridge.register('onNotificationOpened', function (
      title,
      summary,
      extraMap
    ) {
      obj.onNotificationOpened(title, summary, extraMap)
    })
  },
  processCommunication(obj) {
    dsBridge.call('process.processCommunication', obj.key, function (ret) {
      parseResult(ret, obj)
    })
  },
  addPhoneContacter(obj) {
    dsBridge.call('device.addPhoneContacter', obj.key, function (ret) {
      parseResult(ret, obj)
    })
  },
  findPhoneContacter(obj) {
    dsBridge.call('device.findPhoneContacter', obj.key, function (ret) {
      parseResult(ret, obj)
    })
  },
  removePhoneContacter(obj) {
    dsBridge.call('device.removePhoneContacter', obj.key, function (ret) {
      parseResult(ret, obj)
    })
  },
  updatePhoneContacter(obj) {
    dsBridge.call('device.updatePhoneContacter', obj.key, function (ret) {
      parseResult(ret, obj)
    })
  },
  /* NFC和二维码相关的API START */
  scanCode(obj) {
    dsBridge.call('nfc.scanCode', obj.onlyFromCamera, function (ret) {
      parseResult(ret, obj)
    })
  },
  getNFCStatus(obj) {
    dsBridge.call('nfc.getNFCStatus', function (ret) {
      parseResult(ret, obj)
    })
  },
  openNFCSetting(obj) {
    dsBridge.call('nfc.openNFCSetting', function (ret) {
      parseResult(ret, obj)
    })
  },
  /* NFC和二维码相关的API END */
  installApk(obj) {
    dsBridge.call("device.installApk", obj.key, function (ret) {
      parseResult(ret, obj)
    });
  },
  /* 通知相关的API START */
  showNotification(obj) {
    dsBridge.call('notification.showNotification', obj.path, function (ret) {
      parseResult(ret, obj)
    })
  },
  /* 通知相关的API END */
  /* 短信申请权限API START */
  smspermissions(obj) {
    dsBridge.call('device.smspermissions', function (ret) {
      parseResult(ret, obj)
    })
  },
  /* 短信申请权限的API END */

    /* 热更新API START */
    hotUpdate(obj) {
      dsBridge.call('device.hotUpdate', obj.path, function (ret) {
        parseResult(ret, obj)
      })
    },
    /* 短信申请权限的API END */

   uploadFile(obj){
    dsBridge.call('fileTransfer.uploadFile', obj.key, function (ret) {
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