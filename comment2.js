document.addEventListener('DOMContentLoaded', function() {
    let editingCommentId = null;
  
    function loadComments() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'loadComments.jsp', true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          document.getElementById('comments-container').innerHTML = xhr.responseText;
        }
      };
      xhr.send();
    }
  
    loadComments();
  
    document.getElementById('comment-form').addEventListener('submit', function(event) {
      event.preventDefault();
  
      let formData = new FormData(this);
      let xhr = new XMLHttpRequest();
      let url = editingCommentId ? 'updateComment.jsp' : 'saveComment.jsp';
      xhr.open('POST', url, true);
      xhr.onload = function() {
        if (xhr.status === 200 && xhr.responseText.trim() === 'success') {
          loadComments();
          document.getElementById('comment-form').reset();
          editingCommentId = null;
          document.querySelector('button[type="submit"]').innerText = 'Kirim Komentar';
        } else {
          alert('Terjadi kesalahan saat mengirim komentar.');
        }
      };
      if (editingCommentId) {
        formData.append('id', editingCommentId);
      }
      xhr.send(formData);
    });
  
    document.getElementById('comments-container').addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-comment')) {
        var id = event.target.dataset.id;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'deleteComment.jsp', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
          if (xhr.status === 200 && xhr.responseText.trim() === 'success') {
            loadComments();
          } else {
            alert('Terjadi kesalahan saat menghapus komentar.');
          }
        };
        xhr.send('id=' + id);
      }
  
      if (event.target.classList.contains('edit-comment')) {
        var commentDiv = event.target.closest('.comment');
        editingCommentId = event.target.dataset.id;
        var name = commentDiv.querySelector('h4').innerText;
        var content = commentDiv.querySelector('p').innerText;
        
        document.getElementById('comment-name').value = name;
        document.getElementById('comment-content').value = content;
        document.querySelector('button[type="submit"]').innerText = 'Update Komentar';
      }
    });
  });
  