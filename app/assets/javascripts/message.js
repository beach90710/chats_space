$(function(){

  function buildHTML(message) {
    
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="message__text__image">`
    
    var html = `<div class="message" data-message-id="${ message.id }">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="message__text__content">
                      ${message.content}
                    </p>
                    <div class="message__text__image">
                    ${imagehtml}
                    </div>
                  </div>
                </div>`
    
    return html;
  }  

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    console.log(this)
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
      $('.form__submit').prop('disabled', false);
　　 })
    .fail(function() {
      alert('message error');
    })
    return false;
  })
  })
