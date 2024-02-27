import React from "react";

interface MockData {
  team_name: string;
  team_poster: string;
  team_desc: string;
}

interface MockDataComponentProps {
  data: MockData;
}

const AboutPage: React.FC<MockDataComponentProps> = ({data}) => {
  return (
    <>
      <div className="min-h-screen max-h-screen m-10 bg-slate-300 rounded-xl shadow-2xl">
        <div className="grid grid-cols-2 gap-4 m-12">
          <div className="md:m-6 sm:m-4 flex items-center justify-center">
            <p className="text-center sm:text-4xl md:text-6xl font-extrabold italic drop-shadow-2xl ">
              {data.team_name}
            </p>
          </div>
          <div className=" md:m-16 sm:m-12 ">
            <div className="justify-center flex ">
              <img
                className="sm:h-[12rem] sm:w-[12rem] md:h-[18rem] md:w-[18rem] border-2 rounded-3xl shadow-2xl"
                src={data.team_poster}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="ml-10">
            <p className=" text-xl font-bold">Description</p>
          </div>
          {/* <div className="flex justify-center">
            <p className="mt-1 h-1 w-3/4 bg-black"></p>
          </div> */}
          <div className="p-6 bg-slate-200 mx-10 mt-5 mb-10 shadow-2xl">
            <p className=" text-md">{data.team_desc}</p>
          </div>
        </div>
      </div>
    </>
  );
}

const AboutPageApp: React.FC = () => {
  const mockdata: MockData = {
    team_name: "Team Name 1",
    team_poster: "https://i.imgflip.com/4/2b5p.jpg",
    team_desc:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, eteum. Tenetur doloremque, distinctio magni consequuntur dolorumporro provident minima harum necessitatibus minus ut? Quos rerumquidem possimus eum voluptatum.",
  };
  return <AboutPage data={mockdata} />;
};

export default AboutPageApp;
