export default function Footer() {
  return (
    <div className="mt-[50px] flex w-full flex-col items-center justify-center gap-[10px] bg-[#0B265A] py-5">
      <div className="flex w-full items-center justify-center gap-[15px] text-[20px] text-white">
        <a href="#">
          <i className="fa-brands fa-youtube"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-telegram"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-x-twitter"></i>
        </a>
        <a href="#">
          <i className="fa-brands fa-vk"></i>
        </a>
      </div>
      <h1 className="font-poppins text-[16px] text-white">
        © Start, 2025. All rights reserved.
      </h1>
    </div>
  );
}
