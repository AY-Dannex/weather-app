
function BGLoad(){
    return(
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center bg-black/10">
            <div className="h-15 w-15 border border-transparent border-l-5 border-l-white/50 border-t-5 border-b-5 border-r-5 border-r-white/40 rounded-[30px] load"></div>
            <p className="text-white font-bold text-[20px]">Loading...</p>
        </div>
    )
}
export default BGLoad