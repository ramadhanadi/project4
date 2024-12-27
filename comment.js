document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = document.getElementById('comment-name').value;
      const comment = document.getElementById('comment-content').value;
  
      if (name.trim() === '' || comment.trim() === '') {
        alert('Nama dan komentar harus diisi!');
        return;
      }
  
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');
      commentElement.innerHTML = `
        <h3>${name}</h3>
        <p>${comment}</p>
      `;
  
      commentsContainer.prepend(commentElement);
  
      // Clear form fields
      document.getElementById('comment-name').value = '';
      document.getElementById('comment-content').value = '';
    });
  });
  