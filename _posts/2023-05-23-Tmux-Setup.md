---
title: Tmux-Setup
author: Rakshith
date: 2023-05-23 19:47:33 +0530
categories: [linux]
tags: [tmux,linux,config,sysadmin]
---

# Tmux config

Tmux is a terminal multiplexer that allows users to switch between several programs in one terminal window. It also enables users to detach from a session and continue working on it later. Tmux is highly configurable, making it a popular choice for developers and system administrators.

## Setup
### Add the below content in your ~/.tmux.conf

```yaml
set-option -sa terminal-overrides ",xterm*:Tc"
set -g mouse on

#unbind C-b
#set -g prefix C-Space
#bind C-Space send-prefix

# Vim style pane selection
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# Start windows and panes at 1, not 0
set -g base-index 1
set -g pane-base-index 1
set-window-option -g pane-base-index 1
set-option -g renumber-windows on

# Use Alt-arrow keys without prefix key to switch panes
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# Shift arrow to switch windows
bind -n S-Left  previous-window
bind -n S-Right next-window

# Shift Alt vim keys to switch windows
bind -n M-H previous-window
bind -n M-L next-window

set -g @catppuccin_flavour 'mocha'

set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'christoomey/vim-tmux-navigator'
set -g @plugin 'dreamsofcode-io/catppuccin-tmux'
set -g @plugin 'tmux-plugins/tmux-yank'

run '~/.tmux/plugins/tpm/tpm'

# set vi-mode
set-window-option -g mode-keys vi
# keybindings
bind-key -T copy-mode-vi v send-keys -X begin-selection
bind-key -T copy-mode-vi C-v send-keys -X rectangle-toggle
bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel
bind '"' split-window -v -c "#{pane_current_path}"
bind % split-window -h -c "#{pane_current_path}"

bind r source-file ~/.tmux.conf \; display-message "RELOADING CONFIGURATION FILE…"

# STATUS LINE
set -g status on
set -g status-interval 1
set -g status-justify centre # Careful! It is spelled "centre" not "center".
set -g status-style fg=white,bg=black

# Highlight the current window.
setw -g window-status-current-style fg=white,bg=red,bright

# LEFT STATUS
set -g status-left-length 100
set -g status-left-style default
set -g status-left " "
set -g status-left "#h"
set -g status-left "#[fg=colour220] #h #[fg=colour196] #(ip addr show eth0 | grep -e 'state UP' -A 2 | awk '/inet /{printf $2}') #[fg=colour40] #(free -m -h | awk '/Mem/{printf $3\"\/\"$2}') #[fg=colour128] #(free -m | awk '/Mem{printf \"\%\.2f\%\", 100*$2/$3}')"

# RIGHT STATUS
set -g status-right-length 100
set -g status-right-style default
set -g status-right " "
set -g status-right "#[fg=colour39] #(uptime | awk '{printf \$(NF-2)\" \"\$(NF-1)\" \"\$(NF)}' | tr -d ',')\
#[fg=colour40] %F\
#[fg=colour128] %T\
#[fg=colour202] %Z\
#[default]"
```

![Final Setup!](/static/images/tmux-setup.png)
_Final Look!_
