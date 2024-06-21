const applicationDiv = document.querySelector("#applications");
let active = "pending";
const setUpButtons = () => {
  const btns = document.querySelectorAll(".btn-action");
  btns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.id;
      const action = btn.dataset.action;
      const response = await fetch(
        `http://localhost:3002/api/v1/projects/actions/${action}/${id}`
      );
      const data = response.json();
      if (response.ok) {
        alert("action performed success full");
        updateUI(active);
      }
    });
  });
};

const updateUI = async (type) => {
  applicationDiv.innerHTML = ``;
  url = `http://localhost:3002/api/v1/projects/all/${type}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  try {
    data.forEach(() => {
      const {
        st_lastname,
        st_middle_name,
        sp_id,
        sp_description,
        sp_title,
        st_firstname,
        sp_application_date,
        sp_status,
      } = data[0];
      const action = sp_status == "pending" ? ["approve", "reject"] : ["view"];
      let actionBtns = ``;
      action.forEach((btn) => {
        actionBtns += `<button class="btn btn-sm btn-action btn-${btn}" data-action=${btn} id=${sp_id}>${btn}</button>`;
      });

      applicationDiv.innerHTML += `
    <div class="application-card">
         <div class="header-proj">
         <h5>Student: <b>${st_lastname} ${st_middle_name} ${st_firstname} </b> </h5>
         <h5>Project: <b>${sp_title}</b></h5> 
         <div class="app-date">${sp_application_date}</div>   
         </div>
        
         <p>
         ${sp_description.slice(0, 500)}
         </p>
       <div class="card-foooter">
        <div class="proj-status waiting"> ${sp_status} </div>
        <div class="btns" style="display: flex;">
        ${actionBtns}   
        </div>
        
       </div>
       
        </div>   `;
    });
    document.querySelectorAll(".btn-project").forEach((btn) => {
      if (btn.dataset.status == active) {
        btn.classList.add("btn-active");
      } else {
        btn.classList.remove("btn-active");
      }
    });
    if (!data.length) {
      applicationDiv.innerHTML += `<h4 class="no-apps n404">No  ${active} applications</h4`;
    } else {
      setUpButtons();
    }
  } catch (err) {
    console.log(err);
  }
};

updateUI("pending");

document.querySelectorAll(".btn-project").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    active = btn.dataset.status;
    updateUI(btn.dataset.status);
  });
});
