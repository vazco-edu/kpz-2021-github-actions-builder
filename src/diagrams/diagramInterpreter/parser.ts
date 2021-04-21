import * as chevrotain from 'chevrotain';

// Tokens for most common expressions
const True = chevrotain.createToken({ name: 'True', pattern: /true/ });
const False = chevrotain.createToken({ name: 'False', pattern: /false/ });
const Null = chevrotain.createToken({ name: 'Null', pattern: /null/ });
const LParentheses = chevrotain.createToken({
  name: 'LParentheses',
  pattern: /\(/,
});
const RParentheses = chevrotain.createToken({
  name: 'RParentheses',
  pattern: /\)/,
});
const LSquareBrackets = chevrotain.createToken({
  name: 'LSquareBrackets',
  pattern: /\[/,
});
const RSquareBrackets = chevrotain.createToken({
  name: 'RSquareBrackets',
  pattern: /\]/,
});
const Comma = chevrotain.createToken({ name: 'Comma', pattern: /,/ });

// Adding context to our parser
export const Dot = chevrotain.createToken({ name: 'Dot', pattern: /\./ });
export const ContextMemberOrKeyword = chevrotain.createToken({
  name: 'ContextMemberOrKeyword',
  pattern: chevrotain.Lexer.NA,
});
export const ContextMember = chevrotain.createToken({
  name: 'ContextMember',
  pattern: /[a-zA-Z_][a-zA-Z0-9-_]*/,
  categories: ContextMemberOrKeyword,
});
export const Context = chevrotain.createToken({
  name: 'Context',
  pattern: chevrotain.Lexer.NA,
  longer_alt: ContextMember,
});
export const Contexts = [
  'github',
  'env',
  'job',
  'steps',
  'runner',
  'secrets',
  'strategy',
  'matrix',
  'needs',
].map(c =>
  chevrotain.createToken({
    name: `Context${c}`,
    pattern: new RegExp(`${c}`),
    categories: [Context, ContextMemberOrKeyword],
    longer_alt: ContextMember,
  }),
);
// Operators
//
export const Operator = chevrotain.createToken({
  name: 'Operator',
  pattern: chevrotain.Lexer.NA,
  longer_alt: ContextMember,
});
export const And = chevrotain.createToken({
  name: 'And',
  pattern: /&&/,
  categories: Operator,
});
export const Or = chevrotain.createToken({
  name: 'Or',
  pattern: /\|\|/,
  categories: Operator,
});
export const Eq = chevrotain.createToken({
  name: 'Eq',
  pattern: /==/,
  categories: Operator,
});
export const NEq = chevrotain.createToken({
  name: 'NotEq',
  pattern: /!=/,
  categories: Operator,
});
export const LT = chevrotain.createToken({
  name: 'LT',
  pattern: /</,
  categories: Operator,
});
export const LTE = chevrotain.createToken({
  name: 'LTE',
  pattern: /<=/,
  categories: Operator,
});
export const GT = chevrotain.createToken({
  name: 'GT',
  pattern: />/,
  categories: Operator,
});
export const GTE = chevrotain.createToken({
  name: 'GTE',
  pattern: />=/,
  categories: Operator,
});
export const Not = chevrotain.createToken({
  name: 'Not',
  pattern: /!/,
  categories: Operator,
});
// Functions
//
// TODO: Adding all functions as tokens might not be the best idea, but this way we get validation during parsing
export const Function = chevrotain.createToken({
  name: 'Function',
  pattern: chevrotain.Lexer.NA,
  longer_alt: ContextMember,
});
export const contains = chevrotain.createToken({
  name: 'contains',
  pattern: /contains/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
export const startsWith = chevrotain.createToken({
  name: 'startsWith',
  pattern: /startsWith/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
export const endsWith = chevrotain.createToken({
  name: 'endsWith',
  pattern: /endsWith/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
export const join = chevrotain.createToken({
  name: 'join',
  pattern: /join/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
export const toJSON = chevrotain.createToken({
  name: 'toJSON',
  pattern: /toJSON/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
export const fromJSON = chevrotain.createToken({
  name: 'fromJSON',
  pattern: /fromJSON/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
export const hashFiles = chevrotain.createToken({
  name: 'hashFiles',
  pattern: /hashFiles/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
export const success = chevrotain.createToken({
  name: 'success',
  pattern: /success/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
export const always = chevrotain.createToken({
  name: 'always',
  pattern: /always/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
export const failure = chevrotain.createToken({
  name: 'failure',
  pattern: /failure/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
export const format = chevrotain.createToken({
  name: 'format',
  pattern: /format/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
export const cancelled = chevrotain.createToken({
  name: 'cancelled',
  pattern: /cancelled/,
  categories: [Function, ContextMemberOrKeyword],
  longer_alt: ContextMember,
});
const Functions = [
  contains,
  startsWith,
  endsWith,
  join,
  toJSON,
  fromJSON,
  hashFiles,
  success,
  always,
  failure,
  format,
  cancelled,
];

export const StringLiteral = chevrotain.createToken({
  name: 'StringLiteral',
  //pattern: /'(:?[^'']|\\(:?[bfnrtv\\/]|u[0-9a-fA-F]{4}))*'/,
  pattern: /'((?:''|[^'])*)'/,
});
export const NumberLiteral = chevrotain.createToken({
  name: 'NumberLiteral',
  pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/,
});
export const WhiteSpace = chevrotain.createToken({
  name: 'WhiteSpace',
  pattern: /[ \t\n\r]+/,
  group: chevrotain.Lexer.SKIPPED,
});

const allTokens = [
  WhiteSpace,
  NumberLiteral,

  // Built-in functions
  Function,
  contains,
  startsWith,
  format,
  endsWith,
  join,
  toJSON,
  fromJSON,
  hashFiles,
  success,
  always,
  cancelled,
  failure,

  StringLiteral,
  LParentheses,
  RParentheses,
  LSquareBrackets,
  RSquareBrackets,
  Comma,

  // Operators
  Operator,
  And,
  Or,
  Eq,
  NEq,
  LTE,
  LT,
  GTE,
  GT,
  Not,

  // Literals
  True,
  False,
  Null,

  // Contexts (github, env, etc.)
  Context,
  ...Contexts,
  Dot,
  ContextMemberOrKeyword,
  ContextMember,
];
const ExpressionLexer = new chevrotain.Lexer(allTokens);
