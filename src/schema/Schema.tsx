/* eslint-disable no-empty */
/* eslint-disable no-prototype-builtins */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-empty-interface */
// To parse this data:
//
//   import { Convert, Coordinate } from "./file";
//
//   const coordinate = Convert.toCoordinate(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CoordinateClass {
  /**
   * A map of default settings that will apply to all jobs in the workflow.
   */
  defaults?: Defaults;
  /**
   * A map of environment variables that are available to all jobs and steps in the workflow.
   */
  env?: { [key: string]: boolean | number | string };
  /**
   * A workflow run is made up of one or more jobs. Jobs run in parallel by default. To run
   * jobs sequentially, you can define dependencies on other jobs using the
   * jobs.<job_id>.needs keyword.
   * Each job runs in a fresh instance of the virtual environment specified by runs-on.
   * You can run an unlimited number of jobs as long as you are within the workflow usage
   * limits. For more information, see
   * https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#usage-limits.
   */
  jobs: Jobs;
  /**
   * The name of your workflow. GitHub displays the names of your workflows on your
   * repository's actions page. If you omit this field, GitHub sets the name to the workflow's
   * filename.
   */
  name?: string;
  /**
   * The name of the GitHub event that triggers the workflow. You can provide a single event
   * string, array of events, array of event types, or an event configuration map that
   * schedules a workflow or restricts the execution of a workflow to specific files, tags, or
   * branch changes. For a list of available events, see
   * https://help.github.com/en/github/automating-your-workflow-with-github-actions/events-that-trigger-workflows.
   */
  on: Event[] | OnClass | Event;
}

/**
 * A map of default settings that will apply to all jobs in the workflow.
 */
export interface Defaults {
  run?: Run;
}

export interface Run {
  shell?: string;
  'working-directory'?: string;
}

/**
 * A workflow run is made up of one or more jobs. Jobs run in parallel by default. To run
 * jobs sequentially, you can define dependencies on other jobs using the
 * jobs.<job_id>.needs keyword.
 * Each job runs in a fresh instance of the virtual environment specified by runs-on.
 * You can run an unlimited number of jobs as long as you are within the workflow usage
 * limits. For more information, see
 * https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#usage-limits.
 */
export interface Jobs {}

export enum Event {
  CheckRun = 'check_run',
  CheckSuite = 'check_suite',
  Create = 'create',
  Delete = 'delete',
  Deployment = 'deployment',
  DeploymentStatus = 'deployment_status',
  Fork = 'fork',
  Gollum = 'gollum',
  IssueComment = 'issue_comment',
  Issues = 'issues',
  Label = 'label',
  Member = 'member',
  Milestone = 'milestone',
  PageBuild = 'page_build',
  Project = 'project',
  ProjectCard = 'project_card',
  ProjectColumn = 'project_column',
  Public = 'public',
  PullRequest = 'pull_request',
  PullRequestReview = 'pull_request_review',
  PullRequestReviewComment = 'pull_request_review_comment',
  PullRequestTarget = 'pull_request_target',
  Push = 'push',
  RegistryPackage = 'registry_package',
  Release = 'release',
  RepositoryDispatch = 'repository_dispatch',
  Status = 'status',
  Watch = 'watch',
  WorkflowDispatch = 'workflow_dispatch',
  WorkflowRun = 'workflow_run',
}

export interface OnClass {
  /**
   * Runs your workflow anytime the check_run event occurs. More than one activity type
   * triggers this event. For information about the REST API, see
   * https://developer.github.com/v3/checks/runs.
   */
  check_run?: null | PurpleEventObject;
  /**
   * Runs your workflow anytime the check_suite event occurs. More than one activity type
   * triggers this event. For information about the REST API, see
   * https://developer.github.com/v3/checks/suites/.
   */
  check_suite?: null | FluffyEventObject;
  /**
   * Runs your workflow anytime someone creates a branch or tag, which triggers the create
   * event. For information about the REST API, see
   * https://developer.github.com/v3/git/refs/#create-a-reference.
   */
  create?: { [key: string]: any } | null;
  /**
   * Runs your workflow anytime someone deletes a branch or tag, which triggers the delete
   * event. For information about the REST API, see
   * https://developer.github.com/v3/git/refs/#delete-a-reference.
   */
  delete?: { [key: string]: any } | null;
  /**
   * Runs your workflow anytime someone creates a deployment, which triggers the deployment
   * event. Deployments created with a commit SHA may not have a Git ref. For information
   * about the REST API, see https://developer.github.com/v3/repos/deployments/.
   */
  deployment?: { [key: string]: any } | null;
  /**
   * Runs your workflow anytime a third party provides a deployment status, which triggers the
   * deployment_status event. Deployments created with a commit SHA may not have a Git ref.
   * For information about the REST API, see
   * https://developer.github.com/v3/repos/deployments/#create-a-deployment-status.
   */
  deployment_status?: { [key: string]: any } | null;
  /**
   * Runs your workflow anytime when someone forks a repository, which triggers the fork
   * event. For information about the REST API, see
   * https://developer.github.com/v3/repos/forks/#create-a-fork.
   */
  fork?: { [key: string]: any } | null;
  /**
   * Runs your workflow when someone creates or updates a Wiki page, which triggers the gollum
   * event.
   */
  gollum?: { [key: string]: any } | null;
  /**
   * Runs your workflow anytime the issue_comment event occurs. More than one activity type
   * triggers this event. For information about the REST API, see
   * https://developer.github.com/v3/issues/comments/.
   */
  issue_comment?: null | TentacledEventObject;
  /**
   * Runs your workflow anytime the issues event occurs. More than one activity type triggers
   * this event. For information about the REST API, see
   * https://developer.github.com/v3/issues.
   */
  issues?: null | StickyEventObject;
  /**
   * Runs your workflow anytime the label event occurs. More than one activity type triggers
   * this event. For information about the REST API, see
   * https://developer.github.com/v3/issues/labels/.
   */
  label?: null | IndigoEventObject;
  /**
   * Runs your workflow anytime the member event occurs. More than one activity type triggers
   * this event. For information about the REST API, see
   * https://developer.github.com/v3/repos/collaborators/.
   */
  member?: null | IndecentEventObject;
  /**
   * Runs your workflow anytime the milestone event occurs. More than one activity type
   * triggers this event. For information about the REST API, see
   * https://developer.github.com/v3/issues/milestones/.
   */
  milestone?: null | HilariousEventObject;
  /**
   * Runs your workflow anytime someone pushes to a GitHub Pages-enabled branch, which
   * triggers the page_build event. For information about the REST API, see
   * https://developer.github.com/v3/repos/pages/.
   */
  page_build?: { [key: string]: any } | null;
  /**
   * Runs your workflow anytime the project event occurs. More than one activity type triggers
   * this event. For information about the REST API, see
   * https://developer.github.com/v3/projects/.
   */
  project?: null | AmbitiousEventObject;
  /**
   * Runs your workflow anytime the project_card event occurs. More than one activity type
   * triggers this event. For information about the REST API, see
   * https://developer.github.com/v3/projects/cards.
   */
  project_card?: null | CunningEventObject;
  /**
   * Runs your workflow anytime the project_column event occurs. More than one activity type
   * triggers this event. For information about the REST API, see
   * https://developer.github.com/v3/projects/columns.
   */
  project_column?: null | MagentaEventObject;
  /**
   * Runs your workflow anytime someone makes a private repository public, which triggers the
   * public event. For information about the REST API, see
   * https://developer.github.com/v3/repos/#edit.
   */
  public?: { [key: string]: any } | null;
  /**
   * Runs your workflow anytime the pull_request event occurs. More than one activity type
   * triggers this event. For information about the REST API, see
   * https://developer.github.com/v3/pulls.
   * Note: Workflows do not run on private base repositories when you open a pull request from
   * a forked repository.
   * When you create a pull request from a forked repository to the base repository, GitHub
   * sends the pull_request event to the base repository and no pull request events occur on
   * the forked repository.
   * Workflows don't run on forked repositories by default. You must enable GitHub Actions in
   * the Actions tab of the forked repository.
   * The permissions for the GITHUB_TOKEN in forked repositories is read-only. For more
   * information about the GITHUB_TOKEN, see
   * https://help.github.com/en/articles/virtual-environments-for-github-actions.
   */
  pull_request?: PurpleRef | null;
  /**
   * Runs your workflow anytime the pull_request_review event occurs. More than one activity
   * type triggers this event. For information about the REST API, see
   * https://developer.github.com/v3/pulls/reviews.
   * Note: Workflows do not run on private base repositories when you open a pull request from
   * a forked repository.
   * When you create a pull request from a forked repository to the base repository, GitHub
   * sends the pull_request event to the base repository and no pull request events occur on
   * the forked repository.
   * Workflows don't run on forked repositories by default. You must enable GitHub Actions in
   * the Actions tab of the forked repository.
   * The permissions for the GITHUB_TOKEN in forked repositories is read-only. For more
   * information about the GITHUB_TOKEN, see
   * https://help.github.com/en/articles/virtual-environments-for-github-actions.
   */
  pull_request_review?: null | FriskyEventObject;
  /**
   * Runs your workflow anytime a comment on a pull request's unified diff is modified, which
   * triggers the pull_request_review_comment event. More than one activity type triggers this
   * event. For information about the REST API, see
   * https://developer.github.com/v3/pulls/comments.
   * Note: Workflows do not run on private base repositories when you open a pull request from
   * a forked repository.
   * When you create a pull request from a forked repository to the base repository, GitHub
   * sends the pull_request event to the base repository and no pull request events occur on
   * the forked repository.
   * Workflows don't run on forked repositories by default. You must enable GitHub Actions in
   * the Actions tab of the forked repository.
   * The permissions for the GITHUB_TOKEN in forked repositories is read-only. For more
   * information about the GITHUB_TOKEN, see
   * https://help.github.com/en/articles/virtual-environments-for-github-actions.
   */
  pull_request_review_comment?: null | MischievousEventObject;
  /**
   * This event is similar to pull_request, except that it runs in the context of the base
   * repository of the pull request, rather than in the merge commit. This means that you can
   * more safely make your secrets available to the workflows triggered by the pull request,
   * because only workflows defined in the commit on the base repository are run. For example,
   * this event allows you to create workflows that label and comment on pull requests, based
   * on the contents of the event payload.
   */
  pull_request_target?: FluffyRef | null;
  /**
   * Runs your workflow when someone pushes to a repository branch, which triggers the push
   * event.
   * Note: The webhook payload available to GitHub Actions does not include the added,
   * removed, and modified attributes in the commit object. You can retrieve the full commit
   * object using the REST API. For more information, see
   * https://developer.github.com/v3/repos/commits/#get-a-single-commit.
   */
  push?: TentacledRef | null;
  /**
   * Runs your workflow anytime a package is published or updated. For more information, see
   * https://help.github.com/en/github/managing-packages-with-github-packages.
   */
  registry_package?: null | BraggadociousEventObject;
  /**
   * Runs your workflow anytime the release event occurs. More than one activity type triggers
   * this event. For information about the REST API, see
   * https://developer.github.com/v3/repos/releases/ in the GitHub Developer documentation.
   */
  release?: null | EventObject1;
  /**
   * You can use the GitHub API to trigger a webhook event called repository_dispatch when you
   * want to trigger a workflow for activity that happens outside of GitHub. For more
   * information, see
   * https://developer.github.com/v3/repos/#create-a-repository-dispatch-event.
   * To trigger the custom repository_dispatch webhook event, you must send a POST request to
   * a GitHub API endpoint and provide an event_type name to describe the activity type. To
   * trigger a workflow run, you must also configure your workflow to use the
   * repository_dispatch event.
   */
  repository_dispatch?: { [key: string]: any } | null;
  /**
   * You can schedule a workflow to run at specific UTC times using POSIX cron syntax
   * (https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html#tag_20_25_07).
   * Scheduled workflows run on the latest commit on the default or base branch. The shortest
   * interval you can run scheduled workflows is once every 5 minutes.
   * Note: GitHub Actions does not support the non-standard syntax @yearly, @monthly, @weekly,
   * @daily, @hourly, and @reboot.
   * You can use crontab guru (https://crontab.guru/). to help generate your cron syntax and
   * confirm what time it will run. To help you get started, there is also a list of crontab
   * guru examples (https://crontab.guru/examples.html).
   */
  schedule?: Array<
    any[] | boolean | ScheduleClass | number | number | null | string
  >;
  /**
   * Runs your workflow anytime the status of a Git commit changes, which triggers the status
   * event. For information about the REST API, see
   * https://developer.github.com/v3/repos/statuses/.
   */
  status?: { [key: string]: any } | null;
  /**
   * Runs your workflow anytime the watch event occurs. More than one activity type triggers
   * this event. For information about the REST API, see
   * https://developer.github.com/v3/activity/starring/.
   */
  watch?: { [key: string]: any } | null;
  /**
   * You can now create workflows that are manually triggered with the new workflow_dispatch
   * event. You will then see a 'Run workflow' button on the Actions tab, enabling you to
   * easily trigger a run.
   */
  workflow_dispatch?:
    | any[]
    | boolean
    | number
    | number
    | null
    | WorkflowDispatchObject
    | string;
  /**
   * This event occurs when a workflow run is requested or completed, and allows you to
   * execute a workflow based on the finished result of another workflow. For example, if your
   * pull_request workflow generates build artifacts, you can create a new workflow that uses
   * workflow_run to analyze the results and add a comment to the original pull request.
   */
  workflow_run?: null | EventObject2;
}

export interface PurpleEventObject {
  types?: any[];
}

export interface FluffyEventObject {
  types?: any[];
}

export interface TentacledEventObject {
  types?: any[];
}

export interface StickyEventObject {
  types?: any[];
}

export interface IndigoEventObject {
  types?: any[];
}

export interface IndecentEventObject {
  types?: any[];
}

export interface HilariousEventObject {
  types?: any[];
}

export interface AmbitiousEventObject {
  types?: any[];
}

export interface CunningEventObject {
  types?: any[];
}

export interface MagentaEventObject {
  types?: any[];
}

export interface PurpleRef {
  types?: any[];
}

export interface FriskyEventObject {
  types?: any[];
}

export interface MischievousEventObject {
  types?: any[];
}

export interface FluffyRef {
  types?: any[];
}

export interface TentacledRef {}

export interface BraggadociousEventObject {
  types?: any[];
}

export interface EventObject1 {
  types?: any[];
}

export interface ScheduleClass {
  cron?: string;
}

export interface WorkflowDispatchObject {
  /**
   * Input parameters allow you to specify data that the action expects to use during runtime.
   * GitHub stores input parameters as environment variables. Input ids with uppercase letters
   * are converted to lowercase during runtime. We recommended using lowercase input ids.
   */
  inputs?: Inputs;
}

/**
 * Input parameters allow you to specify data that the action expects to use during runtime.
 * GitHub stores input parameters as environment variables. Input ids with uppercase letters
 * are converted to lowercase during runtime. We recommended using lowercase input ids.
 */
export interface Inputs {}

export interface EventObject2 {
  types?: any[];
  workflows?: string[];
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toCoordinate(
    json: string,
  ): any[] | boolean | CoordinateClass | number | number | null | string {
    return cast(
      JSON.parse(json),
      u(a('any'), true, r('CoordinateClass'), 3.14, 0, null, ''),
    );
  }

  public static coordinateToJson(
    value: any[] | boolean | CoordinateClass | number | number | null | string,
  ): string {
    return JSON.stringify(
      uncast(value, u(a('any'), true, r('CoordinateClass'), 3.14, 0, null, '')),
      null,
      2,
    );
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ,
      )} but got ${JSON.stringify(val)}`,
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) {
      return val;
    }
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) {
      return val;
    }
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) {
      return invalidValue('array', val);
    }
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any,
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') {
    return val;
  }
  if (typ === null) {
    if (val === null) {
      return val;
    }
    return invalidValue(typ, val);
  }
  if (typ === false) {
    return invalidValue(typ, val);
  }
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) {
    return transformEnum(typ, val);
  }
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') {
    return transformDate(val);
  }
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  CoordinateClass: o(
    [
      { json: 'defaults', js: 'defaults', typ: u(undefined, r('Defaults')) },
      { json: 'env', js: 'env', typ: u(undefined, m(u(true, 3.14, ''))) },
      { json: 'jobs', js: 'jobs', typ: r('Jobs') },
      { json: 'name', js: 'name', typ: u(undefined, '') },
      { json: 'on', js: 'on', typ: u(a(r('Event')), r('OnClass'), r('Event')) },
    ],
    false,
  ),
  Defaults: o([{ json: 'run', js: 'run', typ: u(undefined, r('Run')) }], false),
  Run: o(
    [
      { json: 'shell', js: 'shell', typ: u(undefined, '') },
      {
        json: 'working-directory',
        js: 'working-directory',
        typ: u(undefined, ''),
      },
    ],
    false,
  ),
  Jobs: o([], false),
  OnClass: o(
    [
      {
        json: 'check_run',
        js: 'check_run',
        typ: u(undefined, u(null, r('PurpleEventObject'))),
      },
      {
        json: 'check_suite',
        js: 'check_suite',
        typ: u(undefined, u(null, r('FluffyEventObject'))),
      },
      { json: 'create', js: 'create', typ: u(undefined, u(m('any'), null)) },
      { json: 'delete', js: 'delete', typ: u(undefined, u(m('any'), null)) },
      {
        json: 'deployment',
        js: 'deployment',
        typ: u(undefined, u(m('any'), null)),
      },
      {
        json: 'deployment_status',
        js: 'deployment_status',
        typ: u(undefined, u(m('any'), null)),
      },
      { json: 'fork', js: 'fork', typ: u(undefined, u(m('any'), null)) },
      { json: 'gollum', js: 'gollum', typ: u(undefined, u(m('any'), null)) },
      {
        json: 'issue_comment',
        js: 'issue_comment',
        typ: u(undefined, u(null, r('TentacledEventObject'))),
      },
      {
        json: 'issues',
        js: 'issues',
        typ: u(undefined, u(null, r('StickyEventObject'))),
      },
      {
        json: 'label',
        js: 'label',
        typ: u(undefined, u(null, r('IndigoEventObject'))),
      },
      {
        json: 'member',
        js: 'member',
        typ: u(undefined, u(null, r('IndecentEventObject'))),
      },
      {
        json: 'milestone',
        js: 'milestone',
        typ: u(undefined, u(null, r('HilariousEventObject'))),
      },
      {
        json: 'page_build',
        js: 'page_build',
        typ: u(undefined, u(m('any'), null)),
      },
      {
        json: 'project',
        js: 'project',
        typ: u(undefined, u(null, r('AmbitiousEventObject'))),
      },
      {
        json: 'project_card',
        js: 'project_card',
        typ: u(undefined, u(null, r('CunningEventObject'))),
      },
      {
        json: 'project_column',
        js: 'project_column',
        typ: u(undefined, u(null, r('MagentaEventObject'))),
      },
      { json: 'public', js: 'public', typ: u(undefined, u(m('any'), null)) },
      {
        json: 'pull_request',
        js: 'pull_request',
        typ: u(undefined, u(r('PurpleRef'), null)),
      },
      {
        json: 'pull_request_review',
        js: 'pull_request_review',
        typ: u(undefined, u(null, r('FriskyEventObject'))),
      },
      {
        json: 'pull_request_review_comment',
        js: 'pull_request_review_comment',
        typ: u(undefined, u(null, r('MischievousEventObject'))),
      },
      {
        json: 'pull_request_target',
        js: 'pull_request_target',
        typ: u(undefined, u(r('FluffyRef'), null)),
      },
      {
        json: 'push',
        js: 'push',
        typ: u(undefined, u(r('TentacledRef'), null)),
      },
      {
        json: 'registry_package',
        js: 'registry_package',
        typ: u(undefined, u(null, r('BraggadociousEventObject'))),
      },
      {
        json: 'release',
        js: 'release',
        typ: u(undefined, u(null, r('EventObject1'))),
      },
      {
        json: 'repository_dispatch',
        js: 'repository_dispatch',
        typ: u(undefined, u(m('any'), null)),
      },
      {
        json: 'schedule',
        js: 'schedule',
        typ: u(
          undefined,
          a(u(a('any'), true, r('ScheduleClass'), 3.14, 0, null, '')),
        ),
      },
      { json: 'status', js: 'status', typ: u(undefined, u(m('any'), null)) },
      { json: 'watch', js: 'watch', typ: u(undefined, u(m('any'), null)) },
      {
        json: 'workflow_dispatch',
        js: 'workflow_dispatch',
        typ: u(
          undefined,
          u(a('any'), true, 3.14, 0, null, r('WorkflowDispatchObject'), ''),
        ),
      },
      {
        json: 'workflow_run',
        js: 'workflow_run',
        typ: u(undefined, u(null, r('EventObject2'))),
      },
    ],
    false,
  ),
  PurpleEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  FluffyEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  TentacledEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  StickyEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  IndigoEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  IndecentEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  HilariousEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  AmbitiousEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  CunningEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  MagentaEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  PurpleRef: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    false,
  ),
  FriskyEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  MischievousEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  FluffyRef: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    false,
  ),
  TentacledRef: o([], false),
  BraggadociousEventObject: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  EventObject1: o(
    [{ json: 'types', js: 'types', typ: u(undefined, a('any')) }],
    'any',
  ),
  ScheduleClass: o(
    [{ json: 'cron', js: 'cron', typ: u(undefined, '') }],
    false,
  ),
  WorkflowDispatchObject: o(
    [{ json: 'inputs', js: 'inputs', typ: u(undefined, r('Inputs')) }],
    'any',
  ),
  Inputs: o([], false),
  EventObject2: o(
    [
      { json: 'types', js: 'types', typ: u(undefined, a('any')) },
      { json: 'workflows', js: 'workflows', typ: u(undefined, a('')) },
    ],
    'any',
  ),
  Event: [
    'check_run',
    'check_suite',
    'create',
    'delete',
    'deployment',
    'deployment_status',
    'fork',
    'gollum',
    'issue_comment',
    'issues',
    'label',
    'member',
    'milestone',
    'page_build',
    'project',
    'project_card',
    'project_column',
    'public',
    'pull_request',
    'pull_request_review',
    'pull_request_review_comment',
    'pull_request_target',
    'push',
    'registry_package',
    'release',
    'repository_dispatch',
    'status',
    'watch',
    'workflow_dispatch',
    'workflow_run',
  ],
};
