import type { AppProps } from "next/app";
import { useState } from "react";
import * as Icon from "react-feather";

import { MetaSearch } from "../components/MetaSearch";

import "@algolia/autocomplete-theme-classic";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen">
        <div
          className="flex-none h-full bg-gray-100 border-r border-gray-200 py-7 px-4"
          style={{ width: "220px" }}
        >
          <svg width="99" height="24" viewBox="0 0 99 24" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.16 0h17.68C22.58 0 24 1.412 24 3.16v17.68c0 1.74-1.413 3.16-3.16 3.16H3.16A3.161 3.161 0 010 20.84V3.153A3.155 3.155 0 013.16 0z"
              fill="#5468FF"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.38 6.314c-3.752 0-6.794 3.03-6.794 6.77 0 3.742 3.042 6.764 6.793 6.764 3.75 0 6.793-3.03 6.793-6.77 0-3.742-3.035-6.764-6.793-6.764zm0 11.536c-2.642 0-4.788-2.136-4.788-4.766S9.738 8.32 12.38 8.32c2.642 0 4.787 2.136 4.787 4.765 0 2.63-2.138 4.766-4.787 4.766zm0-8.557v3.552c0 .101.108.174.203.123l3.167-1.634c.073-.037.095-.124.059-.196a3.943 3.943 0 00-3.284-1.983c-.073 0-.146.058-.146.138zM7.942 6.685l-.416-.414a1.043 1.043 0 00-1.474 0l-.497.494a1.031 1.031 0 000 1.467l.41.407c.065.065.16.05.218-.015.24-.327.503-.639.795-.93.3-.297.606-.559.942-.799.073-.043.08-.145.022-.21zm6.662-1.075v-.821A1.04 1.04 0 0013.56 3.75h-2.43a1.04 1.04 0 00-1.043 1.039v.842c0 .095.087.16.182.138a7.636 7.636 0 012.116-.297c.694 0 1.38.094 2.044.276a.141.141 0 00.175-.138z"
              fill="#fff"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M61.034 18.35c0 1.939-.496 3.356-1.495 4.256-1 .901-2.525 1.351-4.583 1.351-.752 0-2.313-.145-3.56-.42l.459-2.253c1.043.218 2.423.276 3.145.276 1.145 0 1.963-.232 2.452-.697.489-.465.73-1.155.73-2.07v-.465a8.547 8.547 0 01-1.117.421c-.46.138-.992.21-1.59.21-.789 0-1.504-.123-2.153-.37a4.502 4.502 0 01-1.671-1.09c-.46-.479-.825-1.082-1.08-1.8-.256-.72-.387-2.006-.387-2.95 0-.886.139-1.998.409-2.739.277-.74.67-1.38 1.203-1.91.526-.53 1.168-.937 1.92-1.235a7.058 7.058 0 012.59-.487c.927 0 1.78.116 2.612.254.832.138 1.54.284 2.116.443V18.35zm-7.931-5.609c0 1.192.262 2.514.788 3.066.525.552 1.204.828 2.036.828.452 0 .883-.065 1.284-.189.401-.123.722-.269.978-.443V8.95a11.325 11.325 0 00-1.883-.24c-1.036-.03-1.824.392-2.379 1.068-.547.675-.824 1.86-.824 2.963zm21.474 0c0 .96-.138 1.686-.423 2.478-.284.791-.686 1.467-1.204 2.026a5.3 5.3 0 01-1.868 1.3c-.73.306-1.853.48-2.415.48-.562-.007-1.678-.167-2.4-.48a5.434 5.434 0 01-1.861-1.3c-.519-.559-.92-1.235-1.212-2.026a6.715 6.715 0 01-.438-2.477c0-.96.132-1.882.424-2.666.292-.785.7-1.453 1.226-2.013a5.486 5.486 0 011.868-1.293c.722-.305 1.517-.45 2.378-.45.861 0 1.657.153 2.386.45.73.305 1.358.734 1.868 1.293.519.56.92 1.228 1.212 2.013.306.784.46 1.707.46 2.665zm-2.918.008c0-1.228-.27-2.252-.796-2.964-.525-.72-1.262-1.075-2.203-1.075-.942 0-1.679.356-2.204 1.075-.525.72-.78 1.736-.78 2.964 0 1.242.262 2.077.787 2.796.526.727 1.263 1.083 2.204 1.083.941 0 1.678-.363 2.204-1.082.525-.727.788-1.555.788-2.797zm9.274 6.276c-4.677.022-4.677-3.763-4.677-4.366l-.007-13.424 2.853-.45v13.337c0 .341 0 2.506 1.831 2.513v2.39zm5.028 0h-2.868V6.763l2.868-.45v12.712zM84.523 4.97a1.73 1.73 0 001.737-1.722c0-.951-.774-1.721-1.737-1.721-.963 0-1.736.77-1.736 1.721 0 .952.78 1.722 1.736 1.722zM93.09 6.32c.941 0 1.736.116 2.379.349.642.232 1.16.559 1.54.973.379.414.649.98.81 1.576.167.596.247 1.25.247 1.969v7.308c-.438.094-1.102.203-1.992.334-.89.13-1.89.196-2.999.196a9.137 9.137 0 01-2.021-.21c-.613-.139-1.131-.364-1.569-.676a3.274 3.274 0 01-1.014-1.206c-.241-.494-.365-1.191-.365-1.918 0-.697.139-1.14.409-1.62.277-.48.649-.871 1.116-1.176a4.818 4.818 0 011.635-.654 9.41 9.41 0 011.94-.196c.314 0 .643.021.993.058.35.036.715.101 1.109.196v-.465c0-.327-.037-.64-.117-.93a1.99 1.99 0 00-.408-.777 1.917 1.917 0 00-.774-.523 3.384 3.384 0 00-1.218-.218c-.657 0-1.255.08-1.803.174a8.24 8.24 0 00-1.342.327l-.343-2.332c.357-.123.89-.247 1.576-.37a12.472 12.472 0 012.21-.189zm.24 10.308c.876 0 1.526-.051 1.978-.138v-2.891a6.83 6.83 0 00-1.678-.21c-.314-.001-.635.02-.956.072-.321.043-.613.13-.869.254a1.554 1.554 0 00-.62.523c-.16.225-.233.356-.233.697 0 .669.233 1.054.657 1.308.43.261 1 .385 1.722.385zM36.985 6.393c.941 0 1.736.116 2.379.348.642.233 1.16.56 1.54.974.386.421.649.98.81 1.576.167.596.247 1.25.247 1.969v7.307a33.84 33.84 0 01-1.992.335c-.89.13-1.89.196-2.999.196a9.129 9.129 0 01-2.021-.211c-.613-.138-1.131-.363-1.569-.675a3.275 3.275 0 01-1.014-1.206c-.241-.494-.365-1.192-.365-1.918 0-.697.139-1.14.409-1.62.277-.48.65-.872 1.116-1.177a4.815 4.815 0 011.635-.654 9.4 9.4 0 011.94-.196c.314 0 .643.022.993.058.343.037.715.102 1.11.196v-.464c0-.327-.037-.64-.118-.93a1.991 1.991 0 00-.408-.777A1.917 1.917 0 0037.903 9a3.384 3.384 0 00-1.218-.217c-.657 0-1.255.08-1.803.174a8.24 8.24 0 00-1.342.327l-.343-2.332c.357-.124.89-.247 1.576-.37.686-.131 1.423-.19 2.21-.19zm.248 10.315c.876 0 1.525-.051 1.977-.138v-2.891a6.829 6.829 0 00-1.678-.21 6.11 6.11 0 00-.956.072c-.32.043-.613.13-.868.254a1.554 1.554 0 00-.62.523c-.16.225-.234.356-.234.697 0 .668.234 1.053.657 1.308.423.254 1 .385 1.722.385zm11.566 2.317c-4.678.022-4.678-3.763-4.678-4.366l-.007-13.424 2.853-.45v13.337c0 .341 0 2.506 1.831 2.513v2.39z"
              fill="#5468FF"
            ></path>
          </svg>
        </div>
        <div className="w-full">
          <header
            className="flex border-b border-gray-200 items-center w-full"
            style={{ height: "80px" }}
          >
            <div className="flex items-center pl-4 gap-2">
              <Icon.Package
                className="text-gray-600"
                style={{ width: "24px" }}
              />
              <div>
                <div className="text-xs text-gray-500">Application</div>
                T2ZX9HO66V
              </div>
              <Icon.ChevronDown
                className="text-gray-400"
                style={{ width: "18px" }}
              />
            </div>
            <div className="flex flex-grow items-center pl-6 gap-2">
              <Icon.Server
                className="text-gray-600"
                style={{ width: "24px" }}
              />
              <div>
                <div className="text-xs text-gray-500">Index</div>
                dev-meta
              </div>
              <Icon.ChevronDown
                className="text-gray-400"
                style={{ width: "18px" }}
              />
            </div>

            <div className="flex space-x-6 items-center">
              <div className="rounded-full shadow group">
                <SearchButton onClick={() => setIsSearchOpen(true)} />
              </div>
              <div>
                <Icon.Bell
                  className="text-gray-600"
                  style={{ width: "18px" }}
                />
              </div>
              <div>
                <Icon.HelpCircle
                  className="text-gray-600"
                  style={{ width: "18px" }}
                />
              </div>
              <div>
                <Icon.Smile
                  className="text-gray-600"
                  style={{ width: "18px" }}
                />
              </div>
              <div className="flex space-x-2 items-center">
                <div
                  className="bg-green-400 flex items-center text-center rounded-full"
                  style={{ width: "36px", height: "36px" }}
                >
                  <div className="w-full">ME</div>
                </div>
                <Icon.ChevronDown
                  className="text-gray-600"
                  style={{ width: "24px" }}
                />
              </div>
            </div>
          </header>
          <Component {...pageProps} />
          <MetaSearch
            isOpen={isSearchOpen}
            onOpen={() => setIsSearchOpen(true)}
            onClose={() => setIsSearchOpen(false)}
          />
        </div>
      </div>
    </>
  );
}

type SearchButtonProps = {
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-3 rounded-full shadow-lg hover:shadow-xl transition-shadow ease-in-out duration-100 py-3 px-6 bg-gradient-to-b text-gray-600 from-white via-white to-gray-200"
    >
      <svg
        className="h-5 w-5 text-blue-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <span>Search for documentation, pages, ...</span>
      <div className="shadow-lg rounded">
        <div className="rounded border-b-2 border-gray-200 shadow text-xs text-gray-400 bg-gradient-to-b to-white from-gray-50">
          <div className="p-1.5 rounded border-2 border-white">⌘K</div>
        </div>
      </div>
    </button>
  );
}
