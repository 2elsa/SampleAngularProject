import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FlxWealthManagerApiClient } from '@services/flxwealthmanager.api.client';
import { RssFeedModel } from '@shared/rss-feed.model';
import { Utils } from '@shared/utils';
import * as RssParser from 'rss-parser';

@Component({
  selector: 'app-top-story',
  templateUrl: './top-story.component.html',
  styleUrls: ['./top-story.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopStoryComponent implements OnInit {

  topStories: RssFeedModel[] = [];

  constructor(
    private readonly apiClient: FlxWealthManagerApiClient,
    private readonly cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadTopStores();
  }

  private loadTopStores() {
    (async () => {
      const feedResponse = await this.apiClient.getTopStories().toPromise();
      const parser = new RssParser();
      const feed = await parser.parseString(feedResponse.response || '');
      this.processFeeds(feed.items || []);
    })()
  }

  private processFeeds(items: RssParser.Item[]) {
    const specialCharPattern = /^[`‘'!@$%^&*:]+| [`'!@#$%^&*+:]+$/gm;
    items.forEach(i => {
      this.topStories.push({
        content: (i.contentSnippet || '').trim().replace(specialCharPattern, ''),
        title: (i.title || '').trim().replace(specialCharPattern, ''),
        shortDate: Utils.formatDate(new Date(i.pubDate!!), 'MMM do'),
        dateDistance: Utils.formatDateAsDistanceToNow(new Date(i.pubDate!!)),
        link: i.link
      });
    });
    this.cdr.detectChanges();
  }
}
