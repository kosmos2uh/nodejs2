(function() {

    Pusher.logToConsole = true;

    var csrf_Token = getCsrfToken();
    function getCsrfToken() {
      var metas = document.getElementsByTagName('meta');

        for (i=0; i<metas.length; i++) {
          if (metas[i].getAttribute("name") == "_csrf") {
             return metas[i].getAttribute("content");
          }
        }

        return "";
      }

    var serverUrl = "/",
        comments = [],
        pusher = new Pusher('75bf03ec03995b2f1076', {
          cluster: 'eu',
          encrypted: true
        }),
        // Subscribing to the 'flash-comments' Channel
        channel = pusher.subscribe('flash-comments'),
        commentForm = document.getElementById('comment-form'),
        commentsList = document.getElementById('comments-list'),
        commentTemplate = document.getElementById('comment-template');

    // Binding to Pusher Event on our 'flash-comments' Channel
    channel.bind('new_comment',newCommentReceived);

    // Adding to Comment Form Submit Event
    commentForm.addEventListener("submit", addNewComment);

    // New Comment Receive Event Handler
    // We will take the Comment Template, replace placeholders & append to commentsList
    function newCommentReceived(data){
      var newCommentHtml = commentTemplate.innerHTML.replace('{{name}}',data.name);
      // newCommentHtml = newCommentHtml.replace('{{email}}',data.email);
      newCommentHtml = newCommentHtml.replace('{{comment}}',data.comment);
      var newCommentNode = document.createElement('div');
      newCommentNode.classList.add('comment');
      newCommentNode.innerHTML = newCommentHtml;
      commentsList.appendChild(newCommentNode);
    }

    function addNewComment(event){
      event.preventDefault();
      var newComment = {
        "name": document.getElementById('new_comment_name').value,
        // "email": document.getElementById('new_comment_email').value,
        "comment": document.getElementById('new_comment_text').value,
        "post_id": document.getElementById('post_id').value
      }

      var xhr = new XMLHttpRequest();
      xhr.open("POST", serverUrl+"blog/comment", true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhr.setRequestHeader('X-CSRF-Token', csrf_Token);

      xhr.onreadystatechange = function () {
        if (xhr.readyState != 4 || xhr.status != 200){
          console.log("Error: " + xhr.statusText);
          return;
        }

        // On Success of creating a new Comment
        console.log("Success: " + xhr.responseText);
        commentForm.reset();
      };
      console.log("Error: " + newComment);
      xhr.send(JSON.stringify(newComment));
    }

})();
