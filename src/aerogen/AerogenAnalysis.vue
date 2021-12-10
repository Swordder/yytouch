<template>
  <div class="aero_an" data-name="aerogen_analysis">
    <div class="aero_an_item">
      <h1>经营综合报告</h1>
      <div class="aero_an_pic">
        <img src="http://img.youyao99.com/19E1700D56BE9F2BE9D59B69B91E0E4B.png" alt="">
      </div>
      <div class="aerogen_ad">
        <ul class="aerogen_ad_list">
          <li v-for="item in list" :key="item.id">
            <div class="ad_title flex_item">
              <span>{{item.id}}</span>
              <p>{{item.content}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div style="padding-bottom: 70px;">
      <group>
        <template>
          <cell
            title="AerogenⓇ 技术与SVN对比"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 1 ? 'up' : 'down'"
            @click.native="showOrNot(1)">
          </cell>
          <div class="slide aero_ancon_item" :class="show_type_index == 1 ?'animate':''">
            <h4>AerogenⓇ 技术与SVN对比</h4>
            <div class="pics flex_item">
              <div class="pic_item">
                <img src="http://img.youyao99.com/916846CA1A45C59D8A610B3837D63173.png" alt="">
              </div>
              <div class="pic_item">
                <img src="http://img.youyao99.com/05E801A490E2B00F859CE5A3161434D5.png" alt="">
              </div>
            </div>
            <div class="aero_ancon_item_title flex_item">
              <p class="pre_bule">AerogenⓇ</p>
              <span class="font_10">VS</span>
              <p class="af_gray">SVN</p>
            </div>
            <ol>
              <li class="flex_item" v-for="(item, index) in svn_list" :key="index">
                <p class="pre_bule" v-html="item.left_con"></p>
                <span class="font_10">{{item.mid_con}}</span>
                <p class="af_gray" v-html="item.right_con"></p>
              </li>
            </ol>
            <ul>
              <li class="font_10">1.Ari et al. Respir Care 2010;</li>
              <li class="font_10">2. AerogenⓇ. AerogenⓇ Solo Product Sheet; </li>
              <li class="font_10">3. Ari et al. J Aerosol Med Pulm Drug Deliv 2012; </li>
              <li class="font_10">4. Ari Clinical Foundations 2012;</li>
              <li class="font_10">5. Cairo Mosby's Respiratory Care Equipment 2013;</li>
              <li class="font_10">6. Ari & Fink Clin Pulm Med 2015;</li>
              <li class="font_10">7. Clinical Guard. 2014;</li>
            </ul>
          </div>
        </template>
        <template>
          <cell
            title="AerogenⓇ 技术与USN对比"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 2 ? 'up' : 'down'"
            @click.native="showOrNot(2)">
          </cell>
          <div class="slide aero_ancon_item aero_usn_item" :class="show_type_index == 2?'animate':''">
            <h4>AerogenⓇ 技术与USN对比</h4>
            <div class="pics flex_item">
              <div class="pic_item">
                <img src="http://img.youyao99.com/916846CA1A45C59D8A610B3837D63173.png" alt="">
              </div>
              <div class="pic_item">
                <img src="http://img.youyao99.com/4D8069BAEA4E7D874915E97CACD99F0C.png" alt="">
              </div>
            </div>
            <div class="aero_ancon_item_title flex_item">
              <p class="pre_bule">AerogenⓇ</p>
              <span class="font_10">VS</span>
              <p class="af_gray">USN</p>
            </div>
            <ol>
              <li class="flex_item" v-for="(item, index) in usn_list" :key="index">
                <p class="pre_bule" v-html="item.left_con"></p>
                <span class="font_10">{{item.mid_con}}</span>
                <p class="af_gray" v-html="item.right_con"></p>
              </li>
            </ol>
            <ul>
              <li class="font_10">1. AerogenⓇ. AerogenⓇ Solo 产品单;</li>
              <li class="font_10">2. Ari & Fink Clin Pulm Med 2015;</li>
              <li class="font_10">3. Sidler-Moix et al. Respir Care 2015;</li>
              <li class="font_10">4. Carvalho & McConville. J Pharm Pharmacol 2016;</li>
              <li class="font_10">5. Cairo Mosby's Respiratory Care Equipment 2013;</li>
            </ul>
          </div>
        </template>
        <template>
          <cell
            title="AerogenⓇ 技术与MDI对比"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 3 ? 'up' : 'down'"
            @click.native="showOrNot(3)">
          </cell>
          <div class="slide aero_ancon_item" :class="show_type_index == 3 ?'animate':''">
            <h4>AerogenⓇ 技术与MDI对比</h4>
            <div class="pics flex_item">
              <div class="pic_item">
                <img src="http://img.youyao99.com/916846CA1A45C59D8A610B3837D63173.png" alt="">
              </div>
              <div class="pic_item">
                <img src="http://img.youyao99.com/28BCF63577341C0D0A4D23186935501C.png" alt="">
              </div>
            </div>
            <div class="aero_ancon_item_title flex_item">
              <p class="pre_bule">AerogenⓇ</p>
              <span class="font_10">VS</span>
              <p class="af_gray">MDI</p>
            </div>
            <ol>
              <li class="flex_item" v-for="(item, index) in mdi_list" :key="index">
                <p class="pre_bule" v-html="item.left_con"></p>
                <span class="font_10">{{item.mid_con}}</span>
                <p class="af_gray" v-html="item.right_con"></p>
              </li>
            </ol>
            <ul>
              <li class="font_10">HFA, hydrofluoroalkane</li>
              <li class="font_10">1. Alhamad et al. Respir Care 2015;</li>
              <li class="font_10">2. Sims. Chest 2011;</li>
              <li class="font_10">3. AerogenⓇ. AerogenⓇ Solo产品单;</li>
              <li class="font_10">4. AerogenⓇ. AerogenⓇ USB控制器产品单;</li>
              <li class="font_10">5. Bonini & Usmani. COPD Research and Practice 2015;</li>
            </ul>
          </div>
        </template>
        <template>
          <cell
            title="AerogenⓇ 技术完全静音"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 4 ? 'up' : 'down'"
            @click.native="showOrNot(4)">
          </cell>
          <div class="slide aero_ancon_item aero_fourth_item" :class="show_type_index == 4 ?'animate':''">
            <h4>AerogenⓇ 技术完全静音</h4>
            <p>气溶胶设备和呼吸机警报的噪音是医院内两个主要的噪音来源，这将会影响患者的睡眠<sup>1</sup></p>
            <div class="con_list">
              <div class="con_list_item">
                <p class="con_list_title"><span>SVN需要连接空气压缩机或是墙上的气体出口，这两种设备噪音都很大<sup>2</sup></span></p>
                <p class="circle"><i class="iconfont">&#xe609;</i>这使得治疗过程更舒适<sup>2</sup></p>
                <p class="circle margin_b_10" style="margin-bottom: 16px;"><i class="iconfont">&#xe609;</i>孩子哭闹引发的问题<sup>3</sup></p>
              </div>
              <div class="con_list_item">
                <p class="con_list_title">USN不连接空气压缩机；因此它的噪音比SVN<sup>2,4</sup>小</p>
              </div>
            </div>
            <div class="con_tip">
              AerogenⓇ 气溶胶给药设备全静音运行<sup>5</sup>
              <span></span>
            </div>
            <ul>
              <li class="font_10">1. Xie et al. Critical Care 2009;</li>
              <li class="font_10">2. Clinical Guard 2014;</li>
              <li class="font_10">3. Murakami et al. Ann Allergy 1990;</li>
              <li class="font_10">4. Win Health Medical;</li>
              <li class="font_10">5. AerogenⓇ. AerogenⓇ Solo 产品单;</li>
            </ul>
          </div>
        </template>
        <template>
          <cell
            title="AerogenⓇ 可以轻松地整合加药不会打破原有循环"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 5 ? 'up' : 'down'"
            @click.native="showOrNot(5)">
          </cell>
          <div class="slide aero_ancon_item aero_fourth_item bgw" :class="show_type_index == 5 ?'animate':''">
            <h4>AerogenⓇ 可以轻松地整合<br/>加药不会打破原有循环</h4>
            <div class="con_pic">
              <img src="http://img.youyao99.com/FAA4065978C84AF8BB7A07ABEC486DBC.png" alt="">
            </div>
            <div class="con_list">
              <div class="con_list_item margin_b_10" style="margin-bottom: 16px;">
                <p class="con_list_title flex_item"><span>AerogenⓇ 气溶胶给药设备药物潴留将网格从循环中分离出来<sup>1,2</sup></span></p>
                <p class="circle"><i class="iconfont">&#xe609;</i>加药不需要打破通气<sup>2</sup></p>
              </div>
              <div class="con_list_item">
                <p class="con_list_title flex_item black"><span>加药时，替换或是重启SVN都需要打破循环<sup>2,3</sup></span></p>
                <p class="circle margin_b_10 flex_item gray" style="justify-content: flex-start;"><i class="iconfont">&#xe609;</i><span>通气破损会导致患者肺塌陷，肺体积恢复需要一个小时后以上的时间<sup>3</sup></span></p>
              </div>
            </div>
            <div class="con_tip">
              AerogenⓇ Solo可以在循环中阶段性使用28天
              <span></span>
            </div>
            <ul>
              <li class="font_10">1. Ari. Clinical Foundations 2012;</li>
              <li class="font_10">2. AerogenⓇ. AerogenⓇ Solo产品单;</li>
              <li class="font_10">3. Cairo Mosby's Respiratory Care Equipment 2013;</li>
              <li class="font_10">4. Ari Clinical Foundations 2012;</li>
            </ul>
          </div>
        </template>
        <template>
          <cell
            title="AerogenⓇ技术适用于 所有可以气溶胶给药的药物"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 6 ? 'up' : 'down'"
            @click.native="showOrNot(6)">
          </cell>
          <div class="slide aero_ancon_item aero_fourth_item bgcy" :class="show_type_index == 6 ?'animate':''">
            <h4>AerogenⓇ技术适用于 <br/>所有可以气溶胶给药的药物</h4>
            <p style="text-align: center;">气溶胶给药会改变药物溶液的温度这会引起温度敏感药物的降解，如蛋白和肽<sup>1</sup></p>
            <div class="con_graph_list">
              <div class="con_graph_list_item flex_item">
                <div class="pic">
                  <img src="http://img.youyao99.com/91A089D4E740D38E9A1792603B5FB7B4.png" alt="">
                </div>
                <p>SVN会导致液滴温度高达13.5°C低于环境温度<sup>2</sup></p>
              </div>
              <div class="con_graph_list_item flex_item con_graph_m">
                <p>USN会使药物温度增加到20°C<sup>2</sup></p>
                <div class="pic">
                  <img src="http://img.youyao99.com/0D2D17B505145B3A554A2BDEA642A123.png" alt="">
                </div>
              </div>
              <div class="con_graph_list_item flex_item">
                <div class="pic">
                  <img src="http://img.youyao99.com/6DB23823D868A0C4924B020BC2BB8CF0.png" alt="">
                </div>
                <p>VMN与AerogenⓇ相似，相对于SVN和USN相比引起药物温度改变很低<sup>1</sup></p>
              </div>
            </div>
            <div class="con_tip_wrap">
              <div class="con_tip">
                AerogenⓇ 气溶胶给药设备可以有效的<br/>将很多药物气溶胶化<sup>1,2</sup>
                <span></span>
              </div>
            </div>
            <div class="wrap_font_10">
              <ul>
                <li class="font_10">1. Carvalho & McConville. J Pharm Pharmacol 2016;</li>
                <li class="font_10">2. Sidler-Moix et al. Respir Care 2015;</li>
              </ul>
            </div>
          </div>
        </template>
        <template>
          <cell
            title="AerogenⓇ 技术给药量更大"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 7 ? 'up' : 'down'"
            @click.native="showOrNot(7)">
          </cell>
          <div class="slide aero_ancon_item aero_fourth_item bgw" :class="show_type_index == 7 ?'animate':''">
            <h4>AerogenⓇ 技术给药量更大</h4>
            <p class="blue">AerogenⓇ 气溶胶药物给药设备在临床研究中表现比SVN和USN都好<sup>1,2</sup></p>
            <div class="con_pic_list">
              <div class="con_pic_list_item">
                <h5>在儿科机械通气模型中将AerogenⓇ 置于加湿器前，其 相对于SVN和USN给药量更多<sup>1</sup></h5>
                <div class="pic">
                  <img src="http://img.youyao99.com/0CD555F0D091E2E0E1A28D67B740017B.png" alt="">
                </div>
              </div>
              <div class="con_pic_list_item">
                <h5>在健康受试者体内，AerogenⓇ Ultra的肺沉积比SVN给小多四倍<sup>2</sup></h5>
                <div class="pic">
                  <img src="http://img.youyao99.com/F5AC6AD863FD50D550D65E5DFFF1E7C5.png" alt="">
                </div>
              </div>
            </div>
            <div class="con_tip">
              AerogenⓇ 气溶胶给药设备比SVN和USN运<sup>1,2</sup><br/>送到肺部的药物更多
              <span></span>
            </div>
            <ul>
              <li class="font_10">*p<span><</span>0.001 vs AerogenⓇ</li>
              <li class="font_10">1. Berlinski & Willis. Respir Care 2013; </li>
              <li class="font_10">2. Alcoforado et al. Poster presentation at ISAM 2015;</li>
            </ul>
          </div>
        </template>
        <template>
          <cell
            title="AerogenⓇ Ultra 在一半的时间里给药量都更大"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 8 ? 'up' : 'down'"
            @click.native="showOrNot(8)">
          </cell>
          <div class="slide aero_ancon_item aero_fourth_item bgcy" :class="show_type_index == 8 ?'animate':''">
            <h4>AerogenⓇ Ultra 在一半<br/>的时间里给药量都更大</h4>
            <p style="text-align: center;">在COPD模型中，AerogenⓇ Ultra 运输到肺的药物是SVN的八倍<sup>1</sup></p>
            <div class="con_pic_list">
              <div class="con_pic_list_item bgw">
                <h5>在健康成人和COPD患者的模拟自主呼吸模型中，AerogenⓇ Ultra体外每分钟运送药物的量比SVN显著增多<sup>1</sup></h5>
                <div class="pic">
                  <img src="http://img.youyao99.com/21355A7EA105D5145E6524FB2487DAB7.png" alt="">
                </div>
              </div>
              <div class="con_pic_list_item bgw">
                <h5>健康成人和COPD患者在体外aAerogenⓇ Ultra 运送标准剂量的沙丁胺醇比SVN快</h5>
                <div class="pic">
                  <img src="http://img.youyao99.com/6F4B365F124DABBBBD3A0689BBB937DE.png" alt="">
                </div>
              </div>
            </div>
            <div class="con_tip">
              与SVN相比AerogenⓇ Ultra 在一半的时<br/>间里给药量明显更大<sup>1,2</sup>
              <span></span>
            </div>
            <ul>
              <li class="font_10">COPD, Chronic Obstructive Pulmonary Disease 慢性阻塞性肺病</li>
              <li class="font_10">1. Hickin et al. Poster at the College of Emergency Medicine Clinical Excellence Conference. 2014; </li>
              <li class="font_10">2. AerogenⓇ. AerogenⓇ Solo Product Sheet;</li>
            </ul>
          </div>
        </template>
        <template>
          <cell
            title="AerogenⓇ 技术使治疗有了更快的反应"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 9 ? 'up' : 'down'"
            @click.native="showOrNot(9)">
          </cell>
          <div class="slide aero_ancon_item aero_fourth_item bgw" :class="show_type_index == 9 ?'animate':''">
            <h4>AerogenⓇ 技术使治疗有了更快的反应</h4>
            <div class="con_list" style="margin-top: 10px;">
              <div class="con_list_item margin_b_10">
                <p class="con_list_title flex_item black"><span>呼吸科工作人员大部分时间是花在将气溶胶药物递送给病人</span></p>
                <p class="circle flex_item gray"><i class="iconfont">&#xe609;</i><span>影响给药的因素包括气溶胶给药设备类型、残留体积、设备使用的认知能力和物理能力、治疗中的哭闹和干扰<sup>2</sup></span></p>
              </div>
            </div>
            <div class="con_case">
              <img src="http://img.youyao99.com/D72783F3A3DDF2A9594FB7C4861FA214.png" alt="">
              <div class="con_case_pos">
                <div class="up">
                  <p class="title" style="font-weight: bold;">案例研究</p>
                  <p>在儿科急救室(ER)配备AerogenⓇ Solo 是革新计划的一部分</p>
                </div>
                <div class="down">
                  <p class="gray">肠病毒D68感染病人ER护理后取得突破后的评估</p>
                  <p class="black flex_item" style="justify-content: flex-start;margin-top: 6px;"><i class="iconfont">&#xe609;</i>治疗时间从预期的SVN5小时，<br /> 到AerogenⓇ Solo用了2.5小时</p>
                </div>
              </div>
            </div>
            <div class="con_tip">
              根据医院的经验，儿科ER中使用AerogenⓇ<br/> Solo改善了肠病毒D68感染患者的反应时间
              <span></span>
            </div>
          </div>
        </template>
        <template>
          <cell
            title="AerogenⓇ Ultra 技术在循环上"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 10 ? 'up' : 'down'"
            @click.native="showOrNot(10)">
          </cell>
          <div class="slide aero_ancon_item aero_fourth_item bgcy" :class="show_type_index == 10 ?'animate':''">
            <h4>AerogenⓇ Ultra 技术在循环上</h4>
            <div class="con_pic_list" style="margin-top: 20px;padding: 0 38px;">
              <div class="con_pic_list_item bgw br_20">
                <div class="pic">
                  <img src="http://img.youyao99.com/4747125EBE95F7EB3203D7DAA4EC50CF.png" alt="">
                </div>
              </div>
              <div class="con_pic_list_item bgw br_20">
                <div class="pic">
                  <img src="http://img.youyao99.com/4493D5E0A9BBA81509752AA0BAEB751D.png" alt="">
                </div>
              </div>
              <div class="con_pic_list_item bgw br_20">
                <div class="pic">
                  <img src="http://img.youyao99.com/0DD81266A8152A9311E3755B3AB36039.png" alt="">
                </div>
              </div>
            </div>
            <div class="con_list" style="margin-top: 10px;">
              <div class="con_list_item margin_b_10">
                <p class="con_list_title flex_item"><span>AerogenⓇ 气溶胶给药设备的药物池在循环外，与呼吸机管道是分离的，降低了污染的风险<sup>1,2</sup></span></p>
                <p class="circle flex_item" style="justify-content: flex-start;"><i class="iconfont">&#xe609;</i><span>SVN和USN的药物池一般位于循环中，对循环是开放的，增加了污染的风险<sup>1,2</sup></span></p>
              </div>
            </div>
            <div class="con_tip">
              相对于SVN和USN，<sup>1-2</sup> AerogenⓇ Solo和<br/>AerogenⓇ Pro 药物残留体积最小
              <span></span>
            </div>
            <ul>
              <li class="font_10">图片的复制得到了 Muchão, Filho. J Pediatr (Rio J) 2010 和 Kleinstreuer et al. World J Clin Cases 2014 的授权</li>
              <li class="font_10">1. Cairo Mosby's Respiratory Care Equipment 2013;</li>
              <li class="font_10">2. Kleinstreuer et al. World J Clin Cases 2014;</li>
              <li class="font_10">3. Ari et al. J Aerosol Med Pulm Drug Deliv 2012;</li>
            </ul>
          </div>
        </template>
        <template>
          <cell
            title="AerogenⓇ 技术 得到了 医护工作者和患者满意"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 11 ? 'up' : 'down'"
            @click.native="showOrNot(11)">
          </cell>
          <div class="slide aero_ancon_item aero_fourth_item bgw" :class="show_type_index == 11 ?'animate':''">
            <h4>AerogenⓇ 技术 得到了<br/> 医护工作者和患者满意</h4>
            <p class="blue">在儿科急救室配备AerogenⓇ Solo <br/>代替传统的SVN</p>
            <div class="con_pic_list" style="margin-top: 20px;padding: 0 37px;">
              <div class="con_pic_list_item" style="border: none;" >
                <div class="pic" style="padding: 0;border: none;position: relative;">
                  <img src="http://img.youyao99.com/309A37C284DDB335AE5541DB55EC1CCD.png" alt="">
                  <p style="width: 100%;margin: 0;text-align: center; position: absolute;top: 40%;left: 50%;transform: translateX(-50%); color: #FFFFFF;">呼吸疾病医护工作人员建议： <br/>呼吸系统疾病的患儿应采用气溶胶疗法，<br/>用AerogenⓇ Solo 代替SVN。</p>
                </div>
              </div>
            </div>
            <div class="con_tip">
              使用 AerogenⓇ Solo反应的描述如下<br/> “临床医生、患者和父母都给予了积极的评价”
              <span></span>
            </div>
          </div>
        </template>
        <template>
          <cell
            title="AerogenⓇ 技术减少药物浪费"
            is-link
            :border-intent="false"
            :arrow-direction="show_type_index == 12 ? 'up' : 'down'"
            @click.native="showOrNot(12)">
          </cell>
          <div class="slide aero_ancon_item aero_fourth_item bgcy" :class="show_type_index == 12 ?'animate':''">
            <h4>AerogenⓇ 技术减少药物浪费</h4>
            <p>在药物残留体积方面相对于SVN和USN,<br /> AerogenⓇ 气溶胶给药设备减少了浪费</p>
            <div class="con_pic_list" style="margin-top: 20px;">
              <div class="con_pic_list_item bgw" style="border-radius: 4px;">
                <div class="pic" style="padding: 0;">
                  <img src="http://img.youyao99.com/246C1375D83593027311F21FA63AFE6F.png" alt="">
                </div>
              </div>
            </div>
            <div class="con_list" style="margin-top: 10px;">
              <div class="con_list_item margin_b_10">
                <p class="con_list_title"><span>AerogenⓇ 设备治疗过程中不改变药物池中的浓度。</span></p>
              </div>
              <div class="con_list_item margin_b_10">
                <p class="con_list_title"><span>由于治疗中的蒸发作用，SVN和USN池中的药物溶液浓度增加</span></p>
                <p class="circle"><i class="iconfont">&#xe609;</i><span>大量的药物残留增加了药物浪费</span></p>
              </div>
            </div>
            <div class="con_tip">
              相对于SVN和USN ，AerogenⓇ Solo和 AerogenⓇ Pro 药物残留体积最小
              <span></span>
            </div>
            <ul>
              <li class="font_10">*p<span><</span>0.001 相对于其他设备</li>
            </ul>
          </div>
        </template>
      </group>
    </div>
    <AerogenAgentBtn></AerogenAgentBtn>
  </div>
</template>
<script>
  import AerogenAgentBtn from '../../components/AerogenAgentBtn.vue'
  import { wxShare } from '../../config/share.js'
  import { Cell, CellBox, Group } from 'vux'
  export default {
    data(){
      return {
        show_type_index:1,
        list:[
          {
            id:'01',
            content:'AerogenⓇ 气溶胶给药设备全静音运行'
          },
          {
            id:'02',
            content:'AerogenⓇ 技术使用简便，与SVN一样容易携带'
          },
          {
            id:'03',
            content:'与竞争对手相比，AerogenⓇ技术降低了浪费，经济效益更高'
          },
          {
            id:'04',
            content:'与SVN和USV不同，加药时AerogenⓇ技术不会打破循环'
          },
          {
            id:'05',
            content:'AerogenⓇ到肺部的药比SVN更多'
          },
          {
            id:'06',
            content:'AerogenⓇ 气溶胶给药设备比竞争对手的设备适用于更多类型的药物'
          },
        ],
        svn_list:[
          {
            left_con:'与SVN相比给药量多了3-4倍<sup>1</sup>',
            mid_con:'给药量',
            right_con:'比AerogenⓇ Solo给药量小<sup>1</sup>'
          },
          {
            left_con:'药物残留体积<0.1 ml<sup>2</sup>',
            mid_con:'药物残留',
            right_con:'药物残留体积0.8-1.4 ml<sup>3</sup>'
          },
          {
            left_con:'轻松加药，不打破循环剂量<sup>4</sup>',
            mid_con:'加药',
            right_con:'加药需要打破循环<sup>4,5</sup>'
          },
          {
            left_con:'循环上的药物潴留点<sup>3,5,6</sup>',
            mid_con:'潴留点',
            right_con:'药物潴留点对循环开放<sup>3,5,6</sup>'
          },
          {
            left_con:'不增加流量<sup>2</sup>',
            mid_con:'流量',
            right_con:'增加流量，需要调整呼吸机<sup>5,6</sup> 设置和报警'
          },
          {
            left_con:'静音运行<sup>2</sup>',
            mid_con:'音量',
            right_con:'噪音<sup>7</sup>'
          },

        ],
        usn_list:[
          {
            left_con:'适用于溶液、悬浊液、蛋白和肽<sup>1,2</sup>',
            mid_con:'适用',
            right_con:'不适用于悬浊液、蛋白和肽<sup>2</sup>'
          },
          {
            left_con:'药物残留体积<0.1 ml<sup>1</sup>',
            mid_con:'药物残留',
            right_con:'药物残留体积0.5-1.0 ml<sup>2</sup>'
          },
          {
            left_con:'产生的热很少<sup>3,4</sup>',
            mid_con:'产热',
            right_con:'与其他装备比产热多<sup>3,4</sup>'
          },
          {
            left_con:'循环上的药物潴留点<sup>5</sup>',
            mid_con:'潴留点',
            right_con:'药物潴留点对循环开放<sup>5</sup>'
          },
        ],
        mdi_list:[
          {
            left_con:'每次给药相对于MDI<sup>1</sup><br/> 给药量更大',
            mid_con:'给药量',
            right_con:'比AerogenⓇ Solo给药量低<sup>1</sup>'
          },
          {
            left_con:'适用于所有许可的雾化药物',
            mid_con:'适用范围',
            right_con:'可用药物范围有限<sup>2</sup>'
          },
          {
            left_con:'“即插即用”使用方便<sup>3-5</sup>',
            mid_con:'使用方式',
            right_con:'依赖技术<sup>2</sup>'
          },
          {
            left_con:'自由装药操作<sup>5</sup>',
            mid_con:'操作',
            right_con:'药物潴使用HFA推进剂<sup>5</sup>'
          },
        ],

      }
    },
    components:{
      Group,
      Cell,
      AerogenAgentBtn
    },
    mounted() {
      wxShare(
        'AerogenⓇ爱尔真雾化器',
        'Aerogen雾化器拥有超过40项国际专利的获奖技术，给患者带来安静、高效、快速、药效持久的雾化治疗！',
        'http://img.youyao99.com/8017F0F76A89475C6467F4ADA8BBAD5E.png',
        '3D05AC5E2CDBA972A4E5D2E889CE60CC',
        5,
        ''
      );
    },
    methods:{
      showOrNot(id){
        if(this.show_type_index == id){
          this.show_type_index = -1
        } else {
          this.show_type_index = id
        }
      }
    }
  }
</script>
<style lang="less">
  @import '../../assets/css/aerogenCommon';
  .aero_an{
    sup{
      vertical-align: baseline;
    }
    .aero_an_item{
      padding: 20px;
      padding-bottom: 0px;
      h1{
        font-size: 18PX;
        color: #0077C8;
        text-align: center;
        margin-bottom: 36px;
        position: relative;
        &::after{
          content: '';
          display: inline-block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -4px;
          width: 18px;
          height: 3px;
          background-color: #0077C8;
        }
      }
      .aero_an_pic{
        width: 185px;
        margin: 0 auto;
        img{
          width: 100%;
        }
      }
      .aerogen_ad{
        padding: 0;
        margin-top: 15px;
        background-color: #FFFFFF;
        .aerogen_ad_list{
          margin-bottom: 30px;
        }
        .ad_title{
          justify-content: flex-start;
          color: #333333;
          span{
            background-color: #0077C8;
            color: #FFFFFF;
          }
          p{
            display: inline-block;
          }
        }
      }
    }
    .aero_ancon_item{
      background-color: #EAF7FC;
      color: #FFFFFF;
      font-weight: 500;
      text-align: center;
      position: relative;
      h4{
        color: #0077C8;
        font-weight: 500;
        margin: 20px 0 14px;
        position: relative;
        font-weight: bold;
        &::after{
          content: '';
          display: inline-block;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: -4px;
          width: 18px;
          height: 3px;
          background-color: #0077C8;
        }
      }
      .pics{
        margin: 26px 0 10px;
        justify-content: center;
        .pic_item{
          width: 150px;
          margin: 0 17.5px;
          img{
            width: 100%;
          }
        }
      }
      .aero_ancon_item_title{
        justify-content: center;
        margin-bottom: 10px;
        font-size: 16PX;
        font-weight: 500;
        line-height: 30px;
        .pre_bule{
          width: 40%;
          color: #0077C8;
          text-align: right;
        }
        span{
          width: 30px;
          height: 30px;
          text-align: center;
          margin: 0 18px;
          background-color: #FDDB01;
          color: #0077C8;
          line-height: 30px;
          border-radius: 15px;
        }
        .af_gray{
          width: 40%;
          text-align: left;
          color: #999999;
        }
      }
      ol{
        li{
          font-size: 12PX;
          line-height: 16px;
          margin-bottom: 10px;
          justify-content: center;
          padding: 0 2px;
          .pre_bule{
            width: 40%;
            color: #0077C8;
            text-align: right;
          }
          span{
            width: 62px;
            height: 18px;
            text-align: center;
            margin: 0 5px;
            background-color: #FDDB01;
            color: #0077C8;
            line-height: 18px;
            border-radius: 10px;
          }
          .af_gray{
            width: 40%;
            text-align: left;
            color: #999999;
          }

        }
      }
      ul{
        margin: 14px 20px 20px;
        padding: 6px 0;
        background-color: #FFFFFF;
        color: #666666;
        text-align: left;
      }
      .con_graph_list{
        .con_graph_list_item {
          padding: 23px 20px;
          justify-content: flex-start;
          align-items: center;
          .pic{
            margin-left: 20px;
            height: 200px;
            img{
              height: 100%;
            }
          }
          p{
            margin-left: 35px;
            margin-right: 20px;
            color: #FFFFFF;
          }
        }
      }
      .con_pic_list{
        padding: 0 28px;
        .con_pic_list_item{
          border: 1PX solid #067DCE;
          margin-bottom: 30px;
          h5{
            padding: 8px 10px;
            background-color: #067DCE;
            font-weight: normal;
          }
          .pic{
            padding: 20px 14px 10px 10px;
            width: 100%;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        .bgw{
          border: 1PX solid #FFFFFF;
        }
      }
      .br_20{
        border-radius: 20px;
      }
      .con_graph_m{
        background-color: #067DCE;
        .pic{
          margin-right: 20px;
        }
        p{
          text-align: right;
        }
      }
      .con_case{
        width: 297px;
        margin: 30px auto 20px;
        position: relative;
        img{
          width: 100%;
        }
        .con_case_pos{
          position: absolute;
          top: 18px;
          .up{
            margin-bottom: 27px;
            .title{
              text-align: center;
               margin-bottom: 4px;
            }
          }
          .down{
            .gray{
              color: #666666;
            }
            .black{
              color: #333333;
            }
          }
          p{
            color: #0077C8;
            margin: 0 27px;
          }
        }
      }
    }
    .bgcy{
      h4{
        // width: 204px;
        border-radius: 24px !important;
      }
      .con_tip_wrap{
        padding: 30px 30px 25px;
        background-color: #067DCE;
        .con_tip{
          margin: 0 !important;
        }
      }
      .wrap_font_10{
        background-color: #067DCE;
        padding: 0 20px 25px;
        ul{
          margin: 0;
          background-color: #0077C8;
        }
      }
    }
    .aero_usn_item{
      background-color: #FFFFFF;
      ul{
        background-color: #F5F5F5;
      }
    }
    .aero_fourth_item{
      background-color: #0077C8;
      color: #FFFFFF;
      text-align: center;
      font-size: 14PX;
      h4{
        background-color: #FEDD00;
        display: inline-block;
        margin-top: 30px;
        line-height: 24px;
        border-radius: 12px;
        padding:  1px 15px;
        &::after{
          height: 0;
        }
      }
      p{
        margin: 6px 50px 20px;
        text-align: left;
        color: #FDDB01;
      }
      .blue{
        color: #0077C8;
        text-align: center;
      }
      .con_list{
        p{
          color: #FFFFFF;
          margin: 0 34px 4px;
          line-height: 20px;
        }
        .margin_b_10{
          margin-bottom: 10px;
        }
        .con_list_title{
          position: relative;
          padding-left: 10px;
          &::before{
            content: '';
            display: inline-block;
            width: 3px;
            height: 14px;
            background-color: #FDDB01;
            border-radius: 7px;
            position: absolute;
            left: 0;
            top: 1px;
          }
        }
        .black{
          color: #333333;
        }
        .gray{
          color: #666666;
        }
        .circle{
          .iconfont{
            font-size: 14PX;
          }
          /* &::before{
            content: '';
            display: inline-block;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #FFFFFF;
            vertical-align: middle;
            margin:0 7px 0 10px;
          } */
        }
      }
      .con_tip{
        color: #0077C8;
        background-color: #FFFFFF;
        margin: 30px 30px 25px;
        padding: 9px 5px;
        border-radius: 10px;
        position: relative;
        span{
          position: absolute;
          top: -6px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          border-bottom: transparent;
          border-top: transparent;
          border: 6px solid #FFFFFF;
        }
      }
      ul{
        color: #FFFFFF;
        background-color: #138CDE;
        text-align: left;
      }
    }
    .bgw{
      background-color: #FFFFFF;
      h4{
        // width: 204px;
        padding: 6px 16px;
        line-height: 18px;
        border-radius: 24px;
      }
      .con_pic{
        width: 210px;
        margin: 10px auto 30px;
        img{
          width: 100%;
          border-radius: 10px;
        }
      }
      .con_list{
        p{
          color: #0077C8;
        }
        .con_list_title{
          &::before{
            background-color: #0077C8;
            margin-top: 3px;
          }
        }
        .circle{
          &::before{
            background-color: #0077C8;
          }
        }
      }
      .con_tip{
        background-color: #0077C8;
        color: #FFFFFF;
        span{
          border-color: #0077C8;
        }
      }
      ul{
        background-color: #F5F5F5;
        color: #666666;
      }
    }
    .slide {
      overflow: hidden;
      max-height: 0;
      transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
    }
    .animate {
      max-height: 9999px;
      transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
      transition-delay: 0s;
    }
    .vux-label{
      font-size: 14PX;
    }
  }
</style>
