const applicationDiv = document.querySelector("#applications");
const updateUI = async (type) => {
  url = `http://localhost:3002/api/v1/projects/all/${type}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  try {
    Array(6)
      .fill(1)
      .forEach(() => {
        applicationDiv.innerHTML += `
    <div class="application-card">
         <div class="header-proj">
         <h5>Test App lication</h5> 
         <div class="app-date">June 10, 2024</div>   
         </div>
        
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, tempora. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, tempora. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea, tempora.</p>
       <div class="card-foooter">
        <div class="proj-status waiting"> waiting </div>
        <div class="btns" style="display: flex;">
         <button class="view-more">Read More</button>
        <button class="view-more">Edit</button>
        <button class="view-more">Delete</button>   
        </div>
        
       </div>
       
        </div>
    `;
      });
  } catch (err) {
    console.log(err);
  }
};
