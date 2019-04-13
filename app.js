//Escucha el boton login
$('#login').on('click',function(e){
  e.preventDefault()
  let username = $('#user').val()
  if(username != ""){
    $.ajax({
      url: '/users/?username='+username+'',
      method: 'GET',
      data: {},
      success: function(data){
        pintarDatos()
      }
    })
  }
})
