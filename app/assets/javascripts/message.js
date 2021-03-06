$(function(){

  function buildHTML(message) {
    
    var imagehtml = message.image ? `<img src="${message.image}" class="lower-message__image">` : "";
    
    var html = `<div class="message" data-message-id="${ message.id }">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    <div class="lower-message__image">
                    ${imagehtml}
                    </div>
                  </div>
                </div>`
    
    return html;
  }  

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
 
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $('#new_message')[0].reset();
        
     })
    .fail(function() {
      alert('message error');
    })
    return false;
  })

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data("message-id");

      $.ajax({
        url: `api/messages`,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messages) {
        messages.forEach(function(message){
          html = buildHTML(message);
          $('.messages').append(html);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  $(function(){
    setInterval(reloadMessages,5000);
    });
  })
