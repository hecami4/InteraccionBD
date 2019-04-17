/*//Escucha el boton login
$('#login').on('click',function(e){
  e.preventDefault()
  let username = $('#user').val()
  let pwd = $('#pass').val()
  let url = 'login'
  if(username != "" && pwd !=""){
    $.post(url,username,pwd,function(confirm){
      console.log(username,pwd)
    })
  }
})*/
