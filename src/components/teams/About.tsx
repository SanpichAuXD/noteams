import { AboutTeam } from "@/type/team";
import Image from "next/image";


const TruncateText = ({ text, maxLength }: any) => {
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = `${text.slice(0, maxLength)}\n${text.slice(maxLength)}`;

  return <span title={text}>{truncatedText}</span>;
};


const AboutPage= (data : AboutTeam) => {
    return (
      <>
        <div className="min-h-screen max-h-screen m-10 border-4 border-slate-800 rounded-xl shadow-2xl">
          <div className="grid grid-cols-2 gap-4 m-12">
            <div className="md:m-6 sm:m-4 flex items-center justify-center">
              <p className="text-center sm:text-3xl md:text-4xl font-extrabold italic drop-shadow-2xl ">
              <TruncateText text={data.team_name} maxLength={10} />
              </p>
            </div>
            <div className=" md:m-16 sm:m-12 ">
              <div className="justify-center flex ">
                <Image
                    alt="team poster"
                    width={300}
                    height={300}
                    sizes={"100vw"}
                  className="sm:h-[12rem] sm:w-[12rem] md:h-[18rem] md:w-[18rem] border-2 rounded-3xl shadow-2xl"
                  src={data.team_poster !== "" ? data.team_poster : "/team_logo.png"}
                  // src={data.team_poster}
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
            <div className="p-6 border-2 border-slate-800 rounded-md mx-10 mt-5 mb-10 shadow-2xl">
              <p className=" text-md">{data.team_desc ? data.team_desc : "No desccription in this team if your are owner you can edit description in setting page"}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default AboutPage;