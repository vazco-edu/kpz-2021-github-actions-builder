/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Workflow {
  /**
   * A map of default settings that will apply to all jobs in the workflow.
   */
  defaults?: Defaults;
  /**
   * A map of environment variables that are available to all jobs and steps in the workflow.
   */
  env?: { [key: string]: Env };
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
  on: OnUnion;
}

/**
 * A map of default settings that will apply to all jobs in the workflow.
 *
 * A map of default settings that will apply to all steps in the job.
 */
export interface Defaults {
  run?: Run;
}

export interface Run {
  shell?: string;
  'working-directory'?: string;
}

export type Env = boolean | number | string;

/**
 * A workflow run is made up of one or more jobs. Jobs run in parallel by default. To run
 * jobs sequentially, you can define dependencies on other jobs using the
 * jobs.<job_id>.needs keyword.
 * Each job runs in a fresh instance of the virtual environment specified by runs-on.
 * You can run an unlimited number of jobs as long as you are within the workflow usage
 * limits. For more information, see
 * https://help.github.com/en/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#usage-limits.
 */
export type Jobs = Record<JobID, Job>;

/**
 * Each job must have an id to associate with the job. The key job_id is a string and its
 * value is a map of the job's configuration data. You must replace <job_id> with a string
 * that is unique to the jobs object. The <job_id> must start with a letter or _ and contain
 * only alphanumeric characters, -, or _.
 */
export type JobID = string;

/**
 * Each job must have an id to associate with the job. The key job_id is a string and its
 * value is a map of the job's configuration data. You must replace <job_id> with a string
 * that is unique to the jobs object. The <job_id> must start with a letter or _ and contain
 * only alphanumeric characters, -, or _.
 */
export interface Job {
  /**
   * A container to run any steps in a job that don't already specify a container. If you have
   * steps that use both script and container actions, the container actions will run as
   * sibling containers on the same network with the same volume mounts.
   * If you do not set a container, all steps will run directly on the host specified by
   * runs-on unless a step refers to an action configured to run in a container.
   */
  container?: ContainerUnion;
  /**
   * Prevents a workflow run from failing when a job fails. Set to true to allow a workflow
   * run to pass when this job fails.
   */
  'continue-on-error'?: ContinueOnError;
  /**
   * A map of default settings that will apply to all steps in the job.
   */
  defaults?: Defaults;
  /**
   * A map of environment variables that are available to all steps in the job.
   */
  env?: { [key: string]: Env };
  /**
   * The environment that the job references.
   */
  environment?: EnvironmentUnion;
  /**
   * You can use the if conditional to prevent a job from running unless a condition is met.
   * You can use any supported context and expression to create a conditional.
   * Expressions in an if conditional do not require the ${{ }} syntax. For more information,
   * see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.
   */
  if?: string;
  /**
   * The name of the job displayed on GitHub.
   */
  name?: string;
  /**
   * Identifies any jobs that must complete successfully before this job will run. It can be a
   * string or array of strings. If a job fails, all jobs that need it are skipped unless the
   * jobs use a conditional statement that causes the job to continue.
   */
  needs?: Needs;
  /**
   * A map of outputs for a job. Job outputs are available to all downstream jobs that depend
   * on this job.
   */
  outputs?: { [key: string]: string };
  /**
   * The type of machine to run the job on. The machine can be either a GitHub-hosted runner,
   * or a self-hosted runner.
   */
  'runs-on': RunsOn;
  /**
   * Additional containers to host services for a job in a workflow. These are useful for
   * creating databases or cache services like redis. The runner on the virtual machine will
   * automatically create a network and manage the life cycle of the service containers.
   * When you use a service container for a job or your step uses container actions, you don't
   * need to set port information to access the service. Docker automatically exposes all
   * ports between containers on the same network.
   * When both the job and the action run in a container, you can directly reference the
   * container by its hostname. The hostname is automatically mapped to the service name.
   * When a step does not use a container action, you must access the service using localhost
   * and bind the ports.
   */
  services?: { [key: string]: Container };
  /**
   * A job contains a sequence of tasks called steps. Steps can run commands, run setup tasks,
   * or run an action in your repository, a public repository, or an action published in a
   * Docker registry. Not all steps run actions, but all actions run as a step. Each step runs
   * in its own process in the virtual environment and has access to the workspace and
   * filesystem. Because steps run in their own process, changes to environment variables are
   * not preserved between steps. GitHub provides built-in steps to set up and complete a job.
   */
  steps?: Step[];
  /**
   * A strategy creates a build matrix for your jobs. You can define different variations of
   * an environment to run each job in.
   */
  strategy?: Strategy;
  /**
   * The maximum number of minutes to let a workflow run before GitHub automatically cancels
   * it. Default: 360
   */
  'timeout-minutes'?: number;
}

/**
 * A container to run any steps in a job that don't already specify a container. If you have
 * steps that use both script and container actions, the container actions will run as
 * sibling containers on the same network with the same volume mounts.
 * If you do not set a container, all steps will run directly on the host specified by
 * runs-on unless a step refers to an action configured to run in a container.
 */
export type ContainerUnion = Container | string;

export interface Container {
  /**
   * If the image's container registry requires authentication to pull the image, you can use
   * credentials to set a map of the username and password. The credentials are the same
   * values that you would provide to the `docker login` command.
   */
  credentials?: Credentials;
  /**
   * Sets an array of environment variables in the container.
   */
  env?: { [key: string]: Env };
  /**
   * The Docker image to use as the container to run the action. The value can be the Docker
   * Hub image name or a registry name.
   */
  image: string;
  /**
   * Additional Docker container resource options. For a list of options, see
   * https://docs.docker.com/engine/reference/commandline/create/#options.
   */
  options?: string;
  /**
   * Sets an array of ports to expose on the container.
   */
  ports?: Port[];
  /**
   * Sets an array of volumes for the container to use. You can use volumes to share data
   * between services or other steps in a job. You can specify named Docker volumes, anonymous
   * Docker volumes, or bind mounts on the host.
   * To specify a volume, you specify the source and destination path:
   * <source>:<destinationPath>
   * The <source> is a volume name or an absolute path on the host machine, and
   * <destinationPath> is an absolute path in the container.
   */
  volumes?: string[];
}

/**
 * If the image's container registry requires authentication to pull the image, you can use
 * credentials to set a map of the username and password. The credentials are the same
 * values that you would provide to the `docker login` command.
 */
export interface Credentials {
  password?: string;
  username?: string;
}

export type Port = number | string;

export type ContinueOnError = boolean | string;

/**
 * The environment that the job references.
 */
export type EnvironmentUnion = Environment | string;

/**
 * The environment that the job references
 */
export interface Environment {
  /**
   * The name of the environment configured in the repo.
   */
  name: string;
  /**
   * A deployment URL
   */
  url?: string;
}

/**
 * Identifies any jobs that must complete successfully before this job will run. It can be a
 * string or array of strings. If a job fails, all jobs that need it are skipped unless the
 * jobs use a conditional statement that causes the job to continue.
 */
export type Needs = string[] | string;

/**
 * The type of machine to run the job on. The machine can be either a GitHub-hosted runner,
 * or a self-hosted runner.
 */
export type RunsOn = any[] | string;

export interface Step {
  /**
   * Prevents a job from failing when a step fails. Set to true to allow a job to pass when
   * this step fails.
   */
  'continue-on-error'?: ContinueOnError;
  /**
   * Sets environment variables for steps to use in the virtual environment. You can also set
   * environment variables for the entire workflow or a job.
   */
  env?: { [key: string]: Env };
  /**
   * A unique identifier for the step. You can use the id to reference the step in contexts.
   * For more information, see
   * https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.
   */
  id?: string;
  /**
   * You can use the if conditional to prevent a step from running unless a condition is met.
   * You can use any supported context and expression to create a conditional.
   * Expressions in an if conditional do not require the ${{ }} syntax. For more information,
   * see https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.
   */
  if?: string;
  /**
   * A name for your step to display on GitHub.
   */
  name?: string;
  /**
   * Runs command-line programs using the operating system's shell. If you do not provide a
   * name, the step name will default to the text specified in the run command.
   * Commands run using non-login shells by default. You can choose a different shell and
   * customize the shell used to run commands. For more information, see
   * https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#using-a-specific-shell.
   * Each run keyword represents a new process and shell in the virtual environment. When you
   * provide multi-line commands, each line runs in the same shell.
   */
  run?: string;
  shell?: string;
  /**
   * The maximum number of minutes to run the step before killing the process.
   */
  'timeout-minutes'?: number;
  /**
   * Selects an action to run as part of a step in your job. An action is a reusable unit of
   * code. You can use an action defined in the same repository as the workflow, a public
   * repository, or in a published Docker container image (https://hub.docker.com/).
   * We strongly recommend that you include the version of the action you are using by
   * specifying a Git ref, SHA, or Docker tag number. If you don't specify a version, it could
   * break your workflows or cause unexpected behavior when the action owner publishes an
   * update.
   * - Using the commit SHA of a released action version is the safest for stability and
   * security.
   * - Using the specific major action version allows you to receive critical fixes and
   * security patches while still maintaining compatibility. It also assures that your
   * workflow should still work.
   * - Using the master branch of an action may be convenient, but if someone releases a new
   * major version with a breaking change, your workflow could break.
   * Some actions require inputs that you must set using the with keyword. Review the action's
   * README file to determine the inputs required.
   * Actions are either JavaScript files or Docker containers. If the action you're using is a
   * Docker container you must run the job in a Linux virtual environment. For more details,
   * see https://help.github.com/en/articles/virtual-environments-for-github-actions.
   */
  uses?: string;
  /**
   * A map of the input parameters defined by the action. Each input parameter is a key/value
   * pair. Input parameters are set as environment variables. The variable is prefixed with
   * INPUT_ and converted to upper case.
   */
  with?: With;
  'working-directory'?: string;
}

/**
 * A map of the input parameters defined by the action. Each input parameter is a key/value
 * pair. Input parameters are set as environment variables. The variable is prefixed with
 * INPUT_ and converted to upper case.
 *
 * A map of environment variables that are available to all jobs and steps in the workflow.
 *
 * Sets an array of environment variables in the container.
 *
 * A map of environment variables that are available to all steps in the job.
 *
 * Sets environment variables for steps to use in the virtual environment. You can also set
 * environment variables for the entire workflow or a job.
 */
export interface With {
  args?: string;
  entrypoint?: string;
}

/**
 * A strategy creates a build matrix for your jobs. You can define different variations of
 * an environment to run each job in.
 */
export interface Strategy {
  /**
   * When set to true, GitHub cancels all in-progress jobs if any matrix job fails. Default:
   * true
   */
  'fail-fast'?: boolean;
  /**
   * A build matrix is a set of different configurations of the virtual environment. For
   * example you might run a job against more than one supported version of a language,
   * operating system, or tool. Each configuration is a copy of the job that runs and reports
   * a status.
   * You can specify a matrix by supplying an array for the configuration options. For
   * example, if the GitHub virtual environment supports Node.js versions 6, 8, and 10 you
   * could specify an array of those versions in the matrix.
   * When you define a matrix of operating systems, you must set the required runs-on keyword
   * to the operating system of the current job, rather than hard-coding the operating system
   * name. To access the operating system name, you can use the matrix.os context parameter to
   * set runs-on. For more information, see
   * https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.
   */
  matrix: StrategyMatrix;
  /**
   * The maximum number of jobs that can run simultaneously when using a matrix job strategy.
   * By default, GitHub will maximize the number of jobs run in parallel depending on the
   * available runners on GitHub-hosted virtual machines.
   */
  'max-parallel'?: number;
}

/**
 * A build matrix is a set of different configurations of the virtual environment. For
 * example you might run a job against more than one supported version of a language,
 * operating system, or tool. Each configuration is a copy of the job that runs and reports
 * a status.
 * You can specify a matrix by supplying an array for the configuration options. For
 * example, if the GitHub virtual environment supports Node.js versions 6, 8, and 10 you
 * could specify an array of those versions in the matrix.
 * When you define a matrix of operating systems, you must set the required runs-on keyword
 * to the operating system of the current job, rather than hard-coding the operating system
 * name. To access the operating system name, you can use the matrix.os context parameter to
 * set runs-on. For more information, see
 * https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions.
 */
export type StrategyMatrix = { [key: string]: MatrixValue } | string;

export type MatrixValue = Configuration[] | string;

export type Configuration =
  | Configuration[]
  | boolean
  | number
  | { [key: string]: Configuration }
  | string;

/**
 * The name of the GitHub event that triggers the workflow. You can provide a single event
 * string, array of events, array of event types, or an event configuration map that
 * schedules a workflow or restricts the execution of a workflow to specific files, tags, or
 * branch changes. For a list of available events, see
 * https://help.github.com/en/github/automating-your-workflow-with-github-actions/events-that-trigger-workflows.
 */

export type OnUnion = Event[] | OnClass | Event;

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
  schedule?: ScheduleElement[];
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
  workflow_dispatch?: WorkflowDispatchUnion;
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

export type ScheduleElement =
  | any[]
  | boolean
  | ScheduleClass
  | number
  | number
  | null
  | string;

export interface ScheduleClass {
  cron?: string;
}

/**
 * You can now create workflows that are manually triggered with the new workflow_dispatch
 * event. You will then see a 'Run workflow' button on the Actions tab, enabling you to
 * easily trigger a run.
 */
export type WorkflowDispatchUnion =
  | any[]
  | boolean
  | number
  | number
  | null
  | WorkflowDispatchObject
  | string;

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
