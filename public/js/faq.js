// <!-- Active fade animation when click -->        
const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
    faq.addEventListener("click", () => {
    faq.classList.toggle("active");
    });
});
          