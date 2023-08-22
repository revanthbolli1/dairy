// document.addEventListener('DOMContentLoaded', function() {
//     const sucbanner = document.getElementById("success");
//     if (sucbanner.innerText===""){
//         sucbanner.style.display="none";
//     }
//     setTimeout(()=> sucbanner.style.display="none",3000)
// });

document.addEventListener('DOMContentLoaded', function() {
    const sucbanner = document.getElementById("success");

    // Check if the success message has content
    if (sucbanner.innerText.trim() === "") {
        sucbanner.style.display = "none";
    } else {
        sucbanner.style.display = "block"; // Display the message
        setTimeout(() => {
            sucbanner.style.display = "none"; // Hide the message after 5 seconds
        }, 5000); // 5000 milliseconds = 5 seconds
    }
});
