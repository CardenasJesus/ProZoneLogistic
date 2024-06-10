function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center content-center">
       <nav className="h-2/3 w-auto"><dotlottie-player src="https://lottie.host/e95d6a27-ba87-4533-bebd-a106649d88ef/76irKOD0DZ.json" className="" background="transparent" speed="1" loop autoplay></dotlottie-player></nav> 
       <h1 className="font-bold text-center text-lg "> Page Not Found</h1>
       <p className="font-semibold text-center text-md text-gray-400">The page you are looking for does not exist</p>
    </div>
  );
}

export default NotFound;