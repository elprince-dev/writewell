import React from "react";
import "../styles/single.scss";
import Link from "next/link";
import Menu from "@/components/Menu";

const Single = ({ id }) => {
  return (
    <div className="single">
      <div className="content">
        <img src="https://www.w3schools.com/w3images/mountains.jpg" />
        <div className="user">
          <img src="https://www.w3schools.com/w3images/mountains.jpg" />
          <div className="info">
            <span>Mohamed</span>
            <p>posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link href={`/write?edit=${id}`}>
              <img src="/edit.png" />
            </Link>

            <img src="/delete.png" />
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet consectetur, adip</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut ipsum
          ipsa, sit incidunt quas assumenda nostrum accusantium molestiae eaque
          delectus, laudantium fuga iusto rem aperiam reiciendis, eveniet quidem
          laboriosam esse. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Explicabo ex sequi ratione quisquam, ipsum vel animi doloribus
          natus delectus quas quo autem similique nisi atque qui exercitationem
          et ducimus nesciunt? lore Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Dolorum quas, vel, aut similique modi repellendus
          tempora porro ratione ipsam cumque ut hic exercitationem dolore,
          aperiam nobis. Impedit ullam deserunt eius. Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Exercitationem deleniti corrupti
          quo facilis debitis velit hic ratione nihil, pariatur eos ducimus?
          Odit dolor velit labore placeat laborum voluptas autem aliquid.
          delectus, laudantium fuga iusto rem aperiam reiciendis, eveniet quidem
          laboriosam esse. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Explicabo ex sequi ratione quisquam, ipsum vel animi doloribus
          natus delectus quas quo autem similique nisi atque qui exercitationem
          et ducimus nesciunt? lore Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Dolorum quas, vel, aut similique modi repellendus
          tempora porro ratione ipsam cumque ut hic exercitationem dolore,
          aperiam nobis. Impedit ullam deserunt eius. Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Exercitationem deleniti corrupti
          quo facilis debitis velit hic ratione nihil, pariatur eos ducimus?
          Odit dolor velit labore placeat laborum voluptas autem
          aliquid.delectus, laudantium fuga iusto rem aperiam reiciendis,
          eveniet quidem laboriosam esse. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Explicabo ex sequi ratione quisquam, ipsum vel animi
          doloribus natus delectus quas quo autem similique nisi atque qui
          exercitationem et ducimus nesciunt? lore Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Dolorum quas, vel, aut similique modi
          repellendus tempora porro ratione ipsam cumque ut hic exercitationem
          dolore, aperiam nobis. Impedit ullam deserunt eius. Lorem, ipsum dolor
          sit amet consectetur adipisicing elit. Exercitationem deleniti
          corrupti quo facilis debitis velit hic ratione nihil, pariatur eos
          ducimus? Odit dolor velit labore placeat laborum voluptas autem
          aliquid.
        </p>
      </div>
    
        <Menu />

    </div>
  );
};

export default Single;
