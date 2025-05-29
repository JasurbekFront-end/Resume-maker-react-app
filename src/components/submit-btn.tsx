interface SubmitBtnProps{
    text:string
    onSubmit:()=>void
}
export default function SubmitBtn({text,onSubmit}:SubmitBtnProps) {
  return (
    <button className="w-full bg-blue-600 rounded-sm py-3 text-[18px] text-white " onClick={onSubmit}>{text}</button>
  )
}
