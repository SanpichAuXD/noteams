
import Sidenav from "@/components/sidenav/SliderBar";
// Import global styles
import "../globals.css";

// Import necessary components and hooks
import MobileHeader from "@/components/sidenav/MobileHeader";
import Header from "@/components/sidenav/Header";

// Define the RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to track whether the sidebar is open or closed
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  // State to track if the viewport is in mobile mode
  // const [isMobile, setIsMobile] = useState(false);

  // Effect to handle resizing and update isMobile state accordingly
  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth < 1024);

  //   // Initial resize check and event listener setup
  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   // Cleanup: remove event listener on unmount
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    
        <div className="flex h-screen bg-gray-200">
          <Header />
          <div className="relative flex flex-col flex-1 lg:overflow-y-auto lg:overflow-x-hidden">
            {/* Render the Header component if in mobile mode */}
            {/* {isMobile && (
              <MobileHeader
                setSidebarOpen={setSidebarOpen}
                className="sticky top-0 bg-white border-b border-slate-200 z-30"
              />
            )} */}
            {/* Render the main content */}
            <main>{children}</main>
          </div>
        </div>
     
  );
}