document.addEventListener('DOMContentLoaded', () => {

  console.log('Generator JS imported successfully!');

}, false);

// $(document).ready(function() {
  $('.summernote').summernote({
    height: 300,                 // set editor height
    minHeight: null,             // set minimum height of editor
    maxHeight: null,             // set maximum height of editor
    focus: true,
    lang: 'pl-PL',
    toolbar: [
      // [groupName, [list of button]]
      ['misc', ['fullscreen','undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'strikethrough']],
      ['height', ['clear']],
      ['font', ['superscript', 'subscript']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph','height']],
      ['insert', ['picture', 'link', 'video', 'table', 'hr']]
    ],
    popover: {
      image: [
        ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']]
      ],
      link: [
        ['link', ['linkDialogShow', 'unlink']]
      ],
      air: [
        ['color', ['color']],
        ['font', ['bold', 'underline', 'clear']],
        ['para', ['ul', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'picture']]
      ]
    }
  });
// });
