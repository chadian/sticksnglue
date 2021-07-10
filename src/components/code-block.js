import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

const CodeBlock = ({ children, className, trim }) => {
  const language = className ? className.replace(/language-/, "") : "";
  trim = trim ?? true;

  if (trim && typeof children === 'string') {
    children = children.trim();
  }

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;