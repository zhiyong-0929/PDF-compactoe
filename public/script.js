async function submitForm() {
  document.getElementById("loader").innerHTML = "<span style='color: green;'>Compressing.....</span>";
  var formData = new FormData();
  var infile = document.getElementById("input_pdf").files[0];
  var dpi = document.getElementById("dpi").value;
  formData.append("dpi", dpi);
  formData.append("uploadedFile", infile);
  axios.post('/',formData)
    .then(res => { 
      console.log(res);
      console.log(res.data);
      document.getElementById("counter").innerHTML = res.data.count;
      document.getElementById("loader").innerHTML = "<a target='_blank' href='http://localhost:3000/output.pdf'>compressed_pdf</a >";
    })
    .catch(error => {
      console.log(error.response);
      document.getElementById("loader").innerHTML = "<span style='color: red;'>No file is uploaded.</span>";
    });
}

window.onload = function() {
  Particles.init({
    selector: '.background',
    maxParticles: 200,
    color: '#ff0000'
  });
};