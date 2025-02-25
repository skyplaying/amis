/**
 * @file 用来渲染 Markdown
 */
import React from 'react';
import {Renderer, RendererProps} from '../factory';
import {BaseSchema} from '../Schema';
import {resolveVariableAndFilter} from '../utils/tpl-builtin';
import LazyComponent from '../components/LazyComponent';
import {getPropValue} from '../utils/helper';
import {isApiOutdated, isEffectiveApi} from '../utils/api';

/**
 * Markdown 渲染
 * 文档：https://baidu.gitee.io/amis/docs/components/markdown
 */
export interface MarkdownSchema extends BaseSchema {
  /**
   * markdown 渲染
   */
  type: 'markdown';

  /**
   * markdown 内容
   */
  value?: string;

  /**
   * 样式类
   */
  className?: string;

  /**
   * 名字映射
   */
  name?: string;
}

function loadComponent(): Promise<any> {
  return import('../components/Markdown').then(item => item.default);
}

export interface MarkdownProps
  extends RendererProps,
    Omit<MarkdownSchema, 'type' | 'className'> {}

interface MarkdownState {
  content: string;
}

export class Markdown extends React.Component<MarkdownProps, MarkdownState> {
  constructor(props: MarkdownProps) {
    super(props);
    const {name, data, src} = this.props;
    if (src) {
      this.state = {content: ''};
      this.updateContent();
    } else {
      const content =
        getPropValue(this.props) ||
        (name ? resolveVariableAndFilter(name, data, '| raw') : null);
      this.state = {content};
    }
  }

  componentDidUpdate(prevProps: MarkdownProps) {
    const props = this.props;
    if (
      props.src &&
      isApiOutdated(prevProps.src, props.src, prevProps.data, props.data)
    ) {
      this.updateContent();
    } else {
      this.updateContent();
    }
  }

  async updateContent() {
    const {name, data, src, env} = this.props;
    if (src && isEffectiveApi(src, data)) {
      const ret = await env.fetcher(src, data);
      if (typeof ret === 'string') {
        this.setState({content: ret});
      } else if (typeof ret === 'object' && ret.data) {
        this.setState({content: ret.data});
      } else {
        console.error('markdown response error', ret);
      }
    } else {
      const content =
        getPropValue(this.props) ||
        (name ? resolveVariableAndFilter(name, data, '| raw') : null);
      if (content !== this.state.content) {
        this.setState({content});
      }
    }
  }

  render() {
    const {className, classnames: cx} = this.props;

    return (
      <div className={cx('Markdown', className)}>
        <LazyComponent
          getComponent={loadComponent}
          content={this.state.content}
        />
      </div>
    );
  }
}

@Renderer({
  type: 'markdown'
})
export class MarkdownRenderer extends Markdown {}
