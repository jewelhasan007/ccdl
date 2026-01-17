import React from "react";

const todo = () => {
    const collapseAll = [
        { title: "Full Stack Development" , 
        content : "E-Commerce, AI/n8n, Flutter, React-Native"
         },
        { title: "Shopify",
            content : "Udemy course of Shopify"
        },
        { title: "UX/UI_Figma/Canva",
            content : "InterctiveCares course, Youtube content, Instagram Content"
        },
        { title: "Amazon FBA",
            content : "AREA71 course"
        },
        { title: "Client Hunting",
            content : "1.VPN, 2.LInkedIn, 3.YouTube Channel, 4.Google Map, 5.Soft Email"
        },
        { title: "PLC/ ELECTRICAL/ AUTOMATION",
            content : "1.Plc & Automation project, 2.Electrical Design"
        },
        { title: "RS Trad/ ABC License",
            content : "1.Project hunting"
        },
        { title: "E-Shop/ BongMart",
            content : "1.E-Commerce project"
        },
        { title: "Course",
            content : "1.PorgHero, 2.InteractiveCares, 3.Area71"
        }
    ]
  return (
    <div className="bg-gray-100 m-3 p-3 border rounded-2xl">
      <h1>ToDo List</h1>
      <div>
      {
        collapseAll.map((collapse, index) => (
              <div className="collapse collapse-arrow bg-base-100 border border-base-300 mb-1" key={index}>
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
           {collapse.title}
          </div>
          <div className="collapse-content text-sm">
           {collapse.content}
          </div>
        </div>
        ))
      }
       </div>
    </div>
  );
};

export default todo;
