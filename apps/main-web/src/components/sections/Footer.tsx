import { FOOTER, SITE } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="border-t border-border-default bg-bg-secondary px-6 py-12 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        {/* Brand */}
        <div className="md:col-span-2">
          <span className="text-xl font-bold" style={{ color: "#164761" }}>더함 협동조합</span>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {SITE.description}
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="mb-3 text-sm font-semibold">바로가기</h4>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="/consultation"
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                문의하기
              </a>
            </li>
          </ul>
        </div>

        {/* SNS */}
        <div>
          <h4 className="mb-3 text-sm font-semibold">채널</h4>
          <ul className="flex flex-col gap-2 text-sm text-text-secondary">
            <li>
              <a href="http://pf.kakao.com/_XMxaNxj" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text-primary">
                카카오톡 채널
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@thehamcoop" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text-primary">
                유튜브
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/thehamcoop/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text-primary">
                인스타그램
              </a>
            </li>
            <li>
              <a href="http://blog.naver.com/thahamcoop" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text-primary">
                네이버 블로그
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-border-default pt-6 text-left text-xs leading-relaxed text-text-muted">
        <p>상호명: 더함협동조합</p>
        <p>대표자: 김남현</p>
        <p>사업자 등록 번호: 707-81-03048</p>
        <p>주소: 충청남도 천안시 서북구 충무로 143-10(쌍용동)</p>
        <p>유선전화: 070-7954-6965</p>
        <p className="mt-2">Copyright &copy; 2023 더함협동조합. All rights reserved.</p>
      </div>
    </footer>
  );
}
