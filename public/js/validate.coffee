$ ->
  sName = $('#signinName')
  sPwd = $('#signinPwd')
  sBtn = $('#signinModal button:submit')
  rName = $('#signupName')
  rPwd = $('#signupPwd')
  rBtn = $('#signupModal button:submit')
  ok1 = false
  ok2 = false

  sName.blur ->
    _this = $(@).val().length
    if _this >= 3 and _this <= 12 and _this != ''
      $('#nMsg')
        .text '输入成功'
        .removeClass()
        .addClass 'right'
      ok1 = true
    else
      $('#nMsg')
        .text '用户名应该为3-20位之间'
        .removeClass()
        .addClass 'wrong'

  sPwd.blur ->
    _this = $(@).val().length
    if _this >= 6 and _this <= 20 and _this != ''
      $('#pMsg')
      .text '输入成功'
      .removeClass()
      .addClass 'right'
      ok2 = true
    else
      $('#pMsg')
      .text '密码应该为6-20位之间'
      .removeClass()
      .addClass 'wrong'

  sBtn.click ->
    if !ok1 or !ok2
      return false

  rName.blur ->
    _this = $(@).val().length
    if _this >= 3 and _this <= 12 and _this != ''
      $('#rnMsg')
      .text '输入成功'
      .removeClass()
      .addClass 'right'
      ok1 = true
    else
      $('#rnMsg')
      .text '用户名应该为3-20位之间'
      .removeClass()
      .addClass 'wrong'

  rPwd.blur ->
    _this = $(@).val().length
    if _this >= 6 and _this <= 20 and _this != ''
      $('#rpMsg')
      .text '输入成功'
      .removeClass()
      .addClass 'right'
      ok2 = true
    else
      $('#rpMsg')
      .text '密码应该为6-20位之间'
      .removeClass()
      .addClass 'wrong'

  rBtn.click ->
    if !ok1 or !ok2
      return false